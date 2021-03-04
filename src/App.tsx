import React, { useEffect } from 'react';
import { Footer, Header } from './components';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './store/user';
import { RootState } from './store';
import { db } from './firebase';
import Router from './Router';
import './assets/base.scss';

const useStyles = makeStyles(theme => (
  {
    container: {
      margin: '0 auto',
      padding: '72px 16px 0',
      maxWidth: 760,
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        padding: '80px 0 0'
      }
    }
  }
))

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);

  useEffect(() => {
    isSignIn || auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        const doc = await db.collection('users').doc(userData.uid).get();
        const docData = doc.data();
        docData && dispatch(signIn({
          uid: userData.uid,
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
      <Box className={classes.container}>
        <Router />
      </Box>
      {isSignIn && (<Footer />)}
    </div>
  );
}

export default App;
