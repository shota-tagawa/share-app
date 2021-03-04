import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';
import SignUp from './SignUp';
import { Button } from '../components';
import Box from '@material-ui/core/Box';
import bgsm from '../assets/imgs/bg_sm.jpg';
import bgmd from '../assets/imgs/bg_md.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bgsm})`,
    backgroundSize: ' cover',
    backgroundPosition: 'center',
    width: '100vw',
    margin: '-16px calc(50% - 50vw) -20px',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${bgmd})`,
    }
  },
  container: {
    padding: '32px 16px',
    maxWidth: 800,
    margin: '0 auto',
  },
  catch: {
    fontSize: 60,
    textShadow: '4px 4px 0 #000',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'robot',
    marginBottom: 24,
    [theme.breakpoints.up('md')]: {
      fontSize: 70,
      textShadow: '4px 4px 0 #000',
    }
  },
  box: {
    backgroundColor: '#fff',
    padding: 32,
    boxShadow: '4px 4px 16px rgba(0,0,0,0.3)',
    [theme.breakpoints.up('md')]: {
      padding: 64,
    }
  }
}));

const Front = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);

  const signIn = () => {
    if (isSignIn) {
      dispatch(push('/home'));
    } else {
      dispatch(push('/signin'));
    }
  }

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.container}>
          <h1 className={classes.catch}>Make<br />Your Life.</h1>
          <Box className={classes.box} mb={2}>
            <SignUp />
          </Box>
          <Box className={classes.box}>
            <h2 className='heading'>既に会員の方はこちら</h2>
            <Button
              onClick={signIn}
              label='ログイン'
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Front