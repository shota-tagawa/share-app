import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import styles from '../assets/common.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import { ImageGrid, TabBar } from './../components/';


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
  }
}));

const Profile = (props: any) => {
  const params = props.match.params;
  const [userData, setUserData] = useState<any>();
  const [postDatas, setPostDatas] = useState<any>([]);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const user = await db.collection('users').doc(params.id).get();
      const userDataRef = user.data();
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
            <div className={styles.info}>
              <Avatar className={classes.avatar} src={userData.photoURL} />
              <h1 className={styles.displayName}>{userData.displayName}</h1>
              {(userData.uid == uid) && (
                <IconButton
                  style={{ marginLeft: 16 }}
                  onClick={() => dispatch(push('/profileedit'))}
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
            <p>{userData.selfIntroduction}</p>
            <div className={classes.tabBar}>
              <TabBar />
            </div>
          </>
        )}
      </div>
      <ImageGrid postDatas={postDatas} />
    </>
  )
}

export default Profile;