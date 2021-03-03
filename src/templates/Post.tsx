import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { firebaseUserProfile, firebasePost } from '../interface';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import dayjs from 'dayjs';
import { Pic, UserHeader, PostMenu } from '../components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80,
      cursor: 'pointer'
    },
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
            <UserHeader
              uid={poster.uid}
              src={poster.photoURL}
              name={poster.displayName}
              onClick={() => dispatch(push(`/profile/${poster.uid}`))}
            />
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