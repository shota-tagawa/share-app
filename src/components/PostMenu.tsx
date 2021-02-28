import React, { useState, useEffect } from 'react'
import { firebasePost } from '../interface';
import { db } from '../firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 8,
  },
  like: {
    marginRight: 4,
    position: 'relative'
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

  const like = async () => {
    const postRef = await db.collection('posts').doc(id);
    const docSnap = await postRef.get()
    const docData = docSnap.data() as firebasePost;
    const likeUsers = docData.likeUsers;

    // likeUsersに自分のidがあるかどうかチェック
    if (!likeUsers.includes(id)) {
      setIsLike(true);
      await postRef.set({
        likeUsers: [
          ...likeUsers,
          id
        ]
      }, { merge: true });
      setLikeCount(likeUsers.length + 1);
    } else {
      setIsLike(false);
      const newLikeUsers = likeUsers.filter((likeUser) => likeUser !== id)
      await postRef.set({
        likeUsers: newLikeUsers
      }, { merge: true });
      setLikeCount(likeUsers.length - 1);
    }
  }

  useEffect(() => {
    (async () => {
      const docSnap = await db.collection('posts').doc(id).get()
      const docData = docSnap.data() as firebasePost;
      const likeUsers = docData.likeUsers;
      setLikeCount(likeUsers.length);
      if (likeUsers.includes(id)) {
        setIsLike(true);
      }
    })();
  }, [])


  return (
    <div className={classes.root}>
      <div>
        <IconButton onClick={like} className={classes.like}>
          <FavoriteIcon color={isLike ? 'secondary' : 'disabled'} />
          <span className={classes.count}>{likeCount}</span>
        </IconButton>
      </div>
      <IconButton>
        <ChatBubbleOutlineIcon />
      </IconButton>
    </div>
  )

}

export default PostMenu;
