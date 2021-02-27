import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, storage, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const initialState = {
  isSignIn: false,
  uid: '',
  displayName: '',
  photoURL: '',
  selfIntroduction: '',
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        ...state,
        isSignIn: true,
        ...action.payload
      }
    },
    signOut: () => {
      return {
        isSignIn: false,
        uid: '',
        displayName: '',
        photoURL: '',
        selfIntroduction: '',
      }
    },
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const authSignUp = (email: string, password: string) => {
  return async (dispatch: (action: any) => any) => {
    const snapshot = await auth.createUserWithEmailAndPassword(email, password)
      .catch(() => {
        alert('会員登録に失敗しました。入力内容をご確認ください。')
      })
    if (snapshot && snapshot.user) {
      await db.collection('users').doc(snapshot.user.uid).set({
        uid: snapshot.user.uid,
        displayName: '',
        selfIntroduction: '',
        photoURL: '',
      })
      await dispatch(signIn({
        uid: snapshot.user.uid,
      }))
      await dispatch(push('/home'));
    }
  }
}

export const authSignIn = (email: string, password: string) => {
  return async (dispatch: (action: any) => any) => {
    const snapshot = await auth.signInWithEmailAndPassword(email, password)
      .catch(() => {
        alert('ログインに失敗しました。入力内容をご確認ください。')
      })
    if (snapshot && snapshot.user) {
      const uid = snapshot.user.uid;
      const doc = await db.collection('users').doc(snapshot.user.uid).get();
      const docData = doc.data();
      if (!docData) {
        await dispatch(signIn({
          uid,
        }))
      } else {
        await dispatch(signIn({
          uid,
          selfIntroduction: docData.selfIntroduction,
          displayName: docData.displayName,
          photoURL: docData.photoURL
        }))
      }
      await dispatch(push('/home'));
    }
  }
}

export const authSignOut = () => {
  return async (dispatch: (action: any) => any) => {
    await auth.signOut().catch(() => {
      alert('ログアウトに失敗しました')
    })
    await dispatch(signOut());
    await dispatch(push('/'))
  }
}

export const editProfile = (displayName: string, selfIntroduction: string, photoURL: Blob) => {
  return async (dispatch: (action: any) => any) => {
    if (photoURL) {
      const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      const strLength = 24;
      const id = Array.from(Array(strLength)).map(() => str[Math.floor(Math.random() * str.length)]).join('')

      const snapshot = await storage.ref().child(id).put(photoURL);
      const url = await snapshot.ref.getDownloadURL();
      const user = auth.currentUser;
      if (user) {
        //firestore
        await db.collection('users').doc(user.uid).set({
          displayName,
          selfIntroduction,
          photoURL: url
        }, { merge: true })

        //store
        const doc = await db.collection('users').doc(user.uid).get();
        const docData = doc.data();
        if (docData) {
          await dispatch(updateProfile({
            displayName: docData.displayName,
            photoURL: docData.photoURL,
            selfIntroduction: docData.selfIntroduction,
          }))
        }
        await dispatch(push(`/profile/${user.uid}`));
      }
    }

    if (!photoURL) {
      let user = auth.currentUser;
      if (user) {
        //firestore
        await db.collection('users').doc(user.uid).set({
          displayName,
          selfIntroduction,
        }, { merge: true })

        //redux
        const doc = await db.collection('users').doc(user.uid).get();
        const docData = doc.data();
        if (docData) {
          await dispatch(updateProfile({
            displayName: docData.displayName,
            selfIntroduction: docData.selfIntroduction,
          }))
        }
        await dispatch(push(`/profile/${user.uid}`));
      }
    }
  }
}


export default slice.reducer;

export const { signIn, signOut, updateProfile } = slice.actions;