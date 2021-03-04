import React, { useState } from 'react';
import { Button, TextField } from '../components';
import { useDispatch } from 'react-redux';
import { authSignIn } from '../store/user';

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
      <h2 className='heading'>会員ログイン</h2>
      <dl style={{marginBottom:16,lineHeight:1.4}}>
        <dt>ゲスト</dt>
        <dd>
          <ul>
            <li>email: test@test.com</li>
            <li>password: testtest</li>
          </ul>
        </dd>
      </dl>
      <TextField
        fullWidth={true}
        mb={2}
        label="email"
        value={email}
        onChange={(e) => inputEmail(e as React.ChangeEvent<HTMLInputElement>)}
      />
      <TextField
        fullWidth={true}
        mb={2}
        label="password"
        type="password"
        value={password}
        onChange={(e) => inputPassword(e as React.ChangeEvent<HTMLInputElement>)}
      />
      <Button
        onClick={() => { dispatch(authSignIn(email, password)); }}
        label='ログイン'
      />
    </>
  )
}

export default SignIn;