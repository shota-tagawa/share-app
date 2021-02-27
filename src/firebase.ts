import firebase from 'firebase';
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBXaiY5hOwXTQFCZUq1fgU8TWSZ7NdWH-k",
  authDomain: "share-app-293d8.firebaseapp.com",
  projectId: "share-app-293d8",
  storageBucket: "share-app-293d8.appspot.com",
  messagingSenderId: "830424445370",
  appId: "1:830424445370:web:8ddd90d5b67f067ad4ad83",
  measurementId: "G-LNWYEB93XF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebase.storage();

export default firebaseApp;