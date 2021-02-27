import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import styles from '../assets/common.module.scss';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { Pic } from '../components';

const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80,
      cursor: 'pointer'
    },
  }
}));

const Post = (props: any) => {
  const [postData, setPostData] = useState<any>();
  const [poster, setPoster] = useState<any>();
  const [time, setTime] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {

    (async () => {
      const post = await db.collection('posts').doc(props.match.params.id).get();
      const postDataRef = post.data();
      if (postDataRef) {
        const doc = await db.collection('users').doc(postDataRef.poster).get();
        const docData = doc.data();
        docData && setPoster(docData);
        const date = new Date(postDataRef.timestamp * 1000);
        setTime(dayjs(date).format('M月d日'));
      }
      setPostData(post.data());

    })();

  }, [])

  return (
    <>
      {postData && (
        <>
          {poster && (
            <div
              onClick={() => dispatch(push(`/profile/${poster.uid}`))}
              className={styles.info}
              style={{ marginBottom: 16 }}
            >
              <Avatar className={classes.avatar} src={poster.photoURL} />
              <p className={styles.displayName}>{poster.displayName}</p>
            </div>
          )}
          <Pic src={postData.url} />
          <div style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 8 }}>{time}</p>
            <p>{postData.description}</p>
          </div>
        </>
      )}
    </>
  )
}

export default Post;