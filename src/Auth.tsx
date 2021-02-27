import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { authSignIn, authSignOut } from './store/user';
import { auth } from './firebase';
import { signIn, signOut } from './store/user';


type AuthProps = {
  children: any
}

const Auth = (props: AuthProps) => {
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);

  if (!isSignIn) {
    return <></>
  } else {
    return props.children;
  }
}

export default Auth;