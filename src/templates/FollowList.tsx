import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { db } from './../firebase';
import { firebaseUserProfile } from '../interface';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
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
}));

interface followProfile {
  uid: string,
  displayName: string,
  photoURL: string
}

const FollowList = (props: any) => {
  const classes = useStyles();
  const params = props.match.params;
  const [followList, setFollowList] = useState<[followProfile?]>();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      //urlのidからuid > followを取得する
      const user = await db.collection('users').doc(params.id).get();
      const userData = user.data() as firebaseUserProfile;
      const follow = userData.follow;

      //followのリストを作成する
      const newFollowList: [followProfile?] = [];
      follow.forEach(async (followId) => {
        const followUser = await db.collection('users').doc(followId).get();
        const followUserData = followUser.data() as firebaseUserProfile;
        newFollowList.push({
          displayName: followUserData.displayName,
          uid: followUserData.uid,
          photoURL: followUserData.photoURL
        })
        setFollowList(newFollowList);
      })
    })();
  }, []);

  return (
    <ul>
      {followList && followList.map((follow, key) => (
        <li
          key={key}
        >
          {follow && (
            <Box
              onClick={() => dispatch(push(`/profile/${follow.uid}`))}
              className={classes.root}
            >
              <Avatar
                className={classes.avatar}
                src={follow.photoURL}
              />
              <Box className={classes.box}>
                <p className={classes.name}>{follow.displayName}</p>
              </Box>
            </Box>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FollowList;