import React, { useState, useEffect } from 'react';
import { firebaseUserProfile, firebasePost } from '../interface';
import { db } from '../firebase';
import { Tab } from './';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    padding: '8px 0',
    display: 'flex',
    marginRight: '-16px',
    marginLeft: '-16px'
  }
})

interface UserTabBarProps {
  uid: string
  postCount: number
}

const UserTabBar = (props: UserTabBarProps) => {
  const classes = useStyles();
  const { uid, postCount } = props;

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).onSnapshot(snapshot => {
      const userData = snapshot.data() as firebaseUserProfile;

    })
    return () => unsubscribe();
  }, [uid])

  return (
    <Box className={classes.root} mt={2}>
      <Tab
        count={postCount}
        title='投稿'
        unit='件'
      />
      <Tab
        count={0}
        title='フォロワー'
        unit='人'
      />
      <Tab
        count={0}
        title='フォロー中'
        unit='人'
      />
    </Box>
  )
}

export default UserTabBar;