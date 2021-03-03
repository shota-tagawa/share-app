import React, { useCallback } from 'react';
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
  uid: string
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
}

const UserHeader = (props: userHeaderProps) => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const { children, src, name, onClick } = props;
  const classes = useStyles();

  const follow = useCallback(() => {
    (async () => {
      const userRef = db.collection('users').doc(props.uid);
      const doc = await userRef.get();
      const docData = doc.data() as firebaseUserProfile;
      const follower = docData.follower;
      if (!follower.includes(uid)) {
        await userRef.set({
          follower: [
            ...follower,
            uid
          ]
        }, { merge: true })
      } else {
        const newFollower = follower.filter((followerId) => followerId !== uid)
        await userRef.set({
          follower: newFollower
        }, { merge: true })
      }
    })()
  }, [])

  return (
    <Box className={classes.root} onClick={onClick}>
      <Avatar className={classes.avatar} src={src} />
      <Box className={classes.box}>
        <p className={classes.name}>{name}</p>
        {
          (props.uid !== uid) && (
            <Button
              label="フォローする"
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