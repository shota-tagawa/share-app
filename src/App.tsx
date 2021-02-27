import React, { useEffect } from 'react';
import styles from './assets/common.module.scss';
import { Footer, Header } from './components';
import { Home, SignIn, SignUp } from './templates';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from './store/user';
import { RootState } from './store';
import { db } from './firebase';
import Router from './Router';
import './assets/base.scss';

function App() {
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);

  useEffect(() => {
    isSignIn || auth.onAuthStateChanged(async (snapshot) => {
      if (snapshot) {
        const doc = await db.collection('users').doc(snapshot.uid).get();
        const docData = doc.data();
        docData && dispatch(signIn({
          uid: snapshot.uid,
          selfIntroduction: docData.selfIntroduction,
          displayName: docData.displayName,
          photoURL: docData.photoURL
        }));
      }
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className={styles.globalContainer}>
        <Router />
      </div>
      {isSignIn && (<Footer />)}
    </div>
  );
}

export default App;
