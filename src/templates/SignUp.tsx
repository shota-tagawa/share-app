import React, { useState } from 'react';
import { Button, TextField } from '../components';
import Box from '@material-ui/core/Box';
import { authSignUp, authSignIn } from '../store/user';
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
      <div className=''>
        <h2 className='heading'>未登録の方</h2>
        <TextField
          fullWidth={true}
          label="email"
          value={email}
          onChange={(e) => inputEmail(e as React.ChangeEvent<HTMLInputElement>)}
          mb={2}
        />
        <TextField
          mb={2}
          fullWidth={true}
          label="password"
          type="password"
          value={password}
          onChange={(e) => inputPassword(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Button
          onClick={() => { dispatch(authSignUp(email, password)) }}
          label='新規登録'
        />
        <Box style={{ marginTop: 24 }}>
          <h2 className="heading">または</h2>
          <Button
            onClick={() => { dispatch(authSignIn('test@test.com', 'testtest')) }}
            label='ゲストログイン'
          />
        </Box>
      </div>
    </>
  )
}

export default SignUp;