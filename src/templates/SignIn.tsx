import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { authSignIn, authSignOut } from '../store/user';
import styles from '../assets/common.module.scss';


const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <h2 className={styles.heading}>会員ログイン</h2>
      <div className={styles.formWrapper}>
        <div className={styles.formItem}>
          <TextField className={styles.textField} label="email" value={email} onChange={(e) => inputEmail(e as React.ChangeEvent<HTMLInputElement>)} />
        </div>
        <div className={styles.formItem}>
          <TextField className={styles.textField} label="password" type="password" value={password} onChange={(e) => inputPassword(e as React.ChangeEvent<HTMLInputElement>)} />
        </div>
        <div className={styles.formItem}>
          <Button variant="contained" color="primary" onClick={() => { dispatch(authSignIn(email, password)); }} >ログイン</Button>
        </div>
      </div>
    </>
  )
}

export default SignIn;