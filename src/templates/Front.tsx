import React from 'react';
import styles from '../assets/front.module.scss';
import common from '../assets/common.module.scss';
import Button from '@material-ui/core/Button';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { push } from 'connected-react-router';


const Front = () => {
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
      <h1 className={styles.heading}>
        <span>Test App</span>
      </h1>
      <div className={styles.grid}>
        <div className={styles.col}>
          <SignUp />
        </div>
        <div className={styles.col}>
          <div>
            <h2 className={styles.userHeading}>既に会員の方はこちら</h2>
            <Button onClick={signIn} variant="contained" color="primary">ログイン</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Front