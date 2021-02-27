import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';


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