import React, { useState, useEffect } from 'react'
import { firebasePost, firebasePostComment } from '../interface';
import { db } from '../firebase';
import { Modal } from '../components';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { makeStyles } from '@material-ui/core/styles';
import CommentForm from './CommentForm';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 8,
  },
  like: {
    marginRight: 4,
    position: 'relative'
  },
  commentWrapper: {
    height: '100%',
    overflow: 'scroll',
  },
  comment: {
    position: 'relative',
  },
  count: {
    position: 'absolute',
    bottom: 0,
    left: '50%',

    transform: 'translateX(-50%)',
    fontSize: 10,
    lineHeight: 1,
    zIndex: 10,
  }
}));

interface PostMenuProps {
  id: string
}

const PostMenu = (props: PostMenuProps) => {
  const { id } = props
  const classes = useStyles();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [comments, setComments] = useState<firebasePostComment[]>();
  const [open, setOpen] = useState<boolean>(false);

  const like = async () => {
    const postRef = db.collection('posts').doc(id);
    const docRef = await postRef.get();
    const docData = docRef.data() as firebasePost;
    const likeUsers = docData.likeUsers;
    if (!likeUsers.includes(id)) {
      await postRef.set({
        likeUsers: [
          ...likeUsers,
          id
        ]
      }, { merge: true });
    } else {
      const newLikeUsers = likeUsers.filter((likeUser) => likeUser !== id)
      await postRef.set({
        likeUsers: newLikeUsers
      }, { merge: true });
    }
  }

  useEffect(() => {
    const unsubscribe = db.collection('posts').doc(id).onSnapshot(snapshot => {
      const snapshotData = snapshot.data() as firebasePost;
      setLikeCount(snapshotData.likeUsers.length);
      setComments(snapshotData.comments);
      if (snapshotData.likeUsers.includes(id)) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    })
    return () => unsubscribe();
  }, [])


  return (
    <div className={classes.root}>
      <Modal
        open={open}
        setOpen={setOpen}
      >
        <Box className={classes.commentWrapper}>
          {comments && comments.map(comment => (
            <Comment
              content={comment.content}
              displayName={comment.displayName}
              src={comment.photoURL}
              uid={comment.uid}

            />
          ))}
        </Box>
        <CommentForm id={id} />
      </Modal>
      <div>
        <IconButton
          onClick={like}
          className={classes.like}
        >
          <FavoriteIcon color={isLike ? 'secondary' : 'disabled'} />
          <span className={classes.count}>{likeCount}</span>
        </IconButton>
      </div>
      <IconButton
        className={classes.comment}
        onClick={() => setOpen(!open)}
      >
        <ChatBubbleOutlineIcon />
        <span className={classes.count}>{comments ? comments.length : 0}</span>
      </IconButton>
    </div>
  )

}

export default PostMenu;
