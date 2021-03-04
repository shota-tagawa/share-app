import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserHeader } from '../components';
import { firebaseUserProfile } from '../interface';
import { ImageGrid, UserTabBar } from './../components/';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import { db } from '../firebase';

const useStyles = makeStyles({
  root: {
    marginBottom: 16
  }
});

const Profile = (props: any) => {
  const classes = useStyles();
  const params = props.match.params;
  const [userData, setUserData] = useState<firebaseUserProfile>();
  const [postDatas, setPostDatas] = useState<any>([]);
  const [follow, setFollow] = useState<string[]>([]);
  const [follower, setFollower] = useState<string[]>([]);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);

  useEffect(() => {
    (async () => {
      const user = await db.collection('users').doc(params.id).get();
      const userData = user.data() as firebaseUserProfile;
      userData && setUserData(userData);
    })();

    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .where('poster', '==', params.id).get()
      .then((posts) => {
        const newpostDatas: any[] = [];
        posts.forEach((post) => {
          newpostDatas.push(post.data());
        })
        setPostDatas(newpostDatas);
      })

    const unsubscribe = db.collection('users').doc(params.id).onSnapshot(snapshot => {
      const snapshotData = snapshot.data() as firebaseUserProfile;
      setFollow(snapshotData.follow);
      setFollower(snapshotData.follower);
      if (!snapshotData.follower.includes(uid)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    });
    return () => unsubscribe();
  }, [params])

  return (
    <>
      <Box className={classes.root}>
        {userData && (
          <>
            <UserHeader
              uid={userData.uid}
              src={userData.photoURL}
              name={userData.displayName}
              isFollow={isFollow}
            >
              {(userData.uid == uid) && (
                <IconButton
                  style={{ marginLeft: 16 }}
                  onClick={() => dispatch(push('/profileedit'))}
                >
                  <EditIcon />
                </IconButton>
              )}
            </UserHeader>
            <p>{userData.selfIntroduction}</p>
            <UserTabBar
              uid={props.match.params.id}
              postCount={postDatas.length}
              followCount={follow.length}
              followerCount={follower.length}
            />
          </>
        )}
      </Box>
      <ImageGrid postDatas={postDatas} />
    </>
  )
}

export default Profile;