import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
import styles from '../assets/common.module.scss';
import { authSignUp } from '../store/user';
import { useDispatch } from 'react-redux';

const SignUp = () => {
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
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>未登録の方</h2>
        <div className={styles.formItem}>
          <TextField className={styles.textField} label="email" value={email} onChange={(e) => inputEmail(e as React.ChangeEvent<HTMLInputElement>)} />
        </div>
        <div className={styles.formItem}>
          <TextField className={styles.textField} label="password" type="password" value={password} onChange={(e) => inputPassword(e as React.ChangeEvent<HTMLInputElement>)} />
        </div>
        <div className={styles.formItem}>
          <Button variant="contained" color="primary" onClick={() => { dispatch(authSignUp(email, password)) }} >新規登録</Button>
        </div>
      </div>
    </>
  )
}

export default SignUp;