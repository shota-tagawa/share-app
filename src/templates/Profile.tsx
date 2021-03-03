import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserHeader } from '../components';
import { firebaseUserProfile } from '../interface';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import { ImageGrid, UserTabBar } from './../components/';

const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80
    },
  },
  tabBar: {
    marginTop: 16,
    [theme.breakpoints.up('md')]: {
      marginTop: 32,
    }
  },
}));

const Profile = (props: any) => {
  const params = props.match.params;
  const [userData, setUserData] = useState<firebaseUserProfile>();
  const [postDatas, setPostDatas] = useState<any>([]);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const user = await db.collection('users').doc(params.id).get();
      const userDataRef = user.data() as firebaseUserProfile;
      userDataRef && setUserData(userDataRef);
    })();

    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .where('poster', '==', params.id).get()
      .then((snapshot) => {
        const newpostDatas: any[] = [];
        snapshot.forEach((post) => {
          newpostDatas.push(post.data());
        })
        setPostDatas(newpostDatas);
      })

  }, [params])

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {userData && (
          <>
            <UserHeader
              uid={userData.uid}
              src={userData.photoURL}
              name={userData.displayName}
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
            />
          </>
        )}
      </div>
      <ImageGrid postDatas={postDatas} />
    </>
  )
}

export default Profile;