import React, { useState, useEffect } from 'react';
import { firebaseUserProfile, firebasePost } from '../interface';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
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
  postCount: number,
  followCount: number,
  followerCount: number,
}

const UserTabBar = (props: UserTabBarProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uid, postCount, followCount, followerCount } = props;

  return (
    <Box className={classes.root} mt={2}>
      <Tab
        count={postCount}
        title='投稿'
        unit='件'
      />
      <Tab
        count={followerCount}
        title='フォロワー'
        unit='人'
        onClick={() => dispatch(push(`/follower-list/${uid}`))}
        clickable={true}
      />
      <Tab
        count={followCount}
        title='フォロー中'
        unit='人'
        onClick={() => dispatch(push(`/follow-list/${uid}`))}
        clickable={true}
      />
    </Box>
  )
}

export default UserTabBar;