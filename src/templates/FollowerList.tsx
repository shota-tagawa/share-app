import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { db } from './../firebase';
import { firebaseUserProfile } from '../interface';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    marginBottom: 8,
    paddingBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  name: {
    marginBottom: 8,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  box: {
    marginLeft: 16,
  },
});

interface followerProfile {
  uid: string,
  displayName: string,
  photoURL: string
}

const FollowerList = (props: any) => {
  const classes = useStyles();
  const params = props.match.params;
  const [followerList, setFollowerList] = useState<followerProfile[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const newFollowerList: followerProfile[] = [];
      const user = await db.collection('users').doc(params.id).get();
      const userData = user.data() as firebaseUserProfile;
      userData.follower.forEach(async (followerId) => {
        const followerUser = await db.collection('users').doc(followerId).get();
        const followerUserData = followerUser.data() as firebaseUserProfile;
        newFollowerList.push({
          displayName: followerUserData.displayName,
          uid: followerUserData.uid,
          photoURL: followerUserData.photoURL
        })
        setFollowerList([...newFollowerList]);
      })
    })();
  }, []);

  return (
    <ul>
      {followerList && followerList.map((follower, key) => (
        <li
          key={key}
        >
          {follower && (
            <Box
              onClick={() => dispatch(push(`/profile/${follower.uid}`))}
              className={classes.root}
            >
              <Avatar
                className={classes.avatar}
                src={follower.photoURL}
              />
              <Box className={classes.box}>
                <p className={classes.name}>{follower.displayName}</p>
              </Box>
            </Box>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FollowerList;