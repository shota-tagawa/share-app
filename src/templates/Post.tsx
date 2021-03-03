import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { firebaseUserProfile, firebasePost } from '../interface';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import dayjs from 'dayjs';
import { Pic, UserHeader, PostMenu, Button } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

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
  },
  date: {
    fontSize: 10,
    color: '#aaa',
    marginBottom: 8
  }
}));

type PostProps = {} & RouteComponentProps<{ id: string }>;

const Post = (props: PostProps) => {
  const [postData, setPostData] = useState<firebasePost>();
  const [poster, setPoster] = useState<firebaseUserProfile>();
  const [time, setTime] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);

  useEffect(() => {

    (async () => {
      const post = await db.collection('posts').doc(props.match.params.id).get();
      const postDataRef = post.data() as firebasePost;
      if (postDataRef) {
        const doc = await db.collection('users').doc(postDataRef.poster).get();
        const docData = doc.data() as firebaseUserProfile;
        setPoster(docData);
        const date = new Date(postDataRef.timestamp * 1000);
        setTime(dayjs(date).format('M月D日'));
      }
      setPostData(postDataRef);
    })();

  }, [])

  return (
    <>
      {postData && (
        <>
          {poster &&
            <Box className={classes.root} onClick={() => dispatch(push(`/profile/${poster.uid}`))}>
              <Avatar className={classes.avatar} src={poster.photoURL} />
              <Box className={classes.box}>
                <p className={classes.name}>{poster.displayName}</p>
              </Box>
            </Box>
          }
          <Pic src={postData.url} />
          <div style={{ marginTop: 8 }}>
            <PostMenu id={props.match.params.id} />
            <p className={classes.date}>{time}</p>
            <p>{postData.description}</p>
          </div>
        </>
      )}
    </>
  )
}

export default Post;