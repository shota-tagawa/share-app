import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { firebaseUserProfile } from '../interface';
import { db } from '../firebase';
import { Button } from './';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginBottom: 8,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  box: {
    marginLeft: 16,
  }
}));

interface userHeaderProps {
  children?: React.ReactNode,
  src: string,
  name: string,
  uid: string,
  isFollow: boolean,
  clickable?: boolean
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
}

const UserHeader = (props: userHeaderProps) => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const { children, src, name, onClick, isFollow, clickable } = props;
  const classes = useStyles();

  const follow = useCallback(() => {
    (async () => {
      const userRef = db.collection('users').doc(uid);
      const userDoc = await userRef.get();
      const userDocData = userDoc.data() as firebaseUserProfile;
      const follow = userDocData.follow;
      const targetUserRef = db.collection('users').doc(props.uid);
      const targetDoc = await targetUserRef.get();
      const targetDocData = targetDoc.data() as firebaseUserProfile;
      const follower = targetDocData.follower;

      if (!follower.includes(uid)) {
        await targetUserRef.set({
          follower: [
            ...follower,
            uid
          ]
        }, { merge: true })
        await userRef.set({
          follow: [
            ...follow,
            props.uid
          ]
        }, { merge: true });
      } else {
        const newFollower = follower.filter(followerId => followerId !== uid)
        const newFollow = follow.filter(followId => followId !== props.uid)
        await targetUserRef.set({
          follower: newFollower
        }, { merge: true })
        await userRef.set({
          follow: newFollow
        }, { merge: true })
      }
    })()
  }, [])

  return (
    <Box
      className={classes.root}
      onClick={onClick}
      style={{
        cursor: clickable ? 'pointer' : 'auto'
      }}
    >
      <Avatar className={classes.avatar} src={src} />
      <Box className={classes.box}>
        <p className={classes.name}>{name}</p>
        {
          (props.uid !== uid) && (
            <Button
              label={isFollow ? 'フォローする' : 'フォロー解除'}
              onClick={follow}
            />
          )
        }
      </Box>
      {children}
    </Box>
  )
}

export default UserHeader;