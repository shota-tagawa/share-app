import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from './';
import { db } from '../firebase';
import { firebasePost } from '../interface';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 'top auto 0',
    borderTop: '1px solid #ccc',
    flexShrink: 0,
    paddingTop:8
  }
})

interface CommentFormProps {
  id: string
}

const CommentForm = (props: CommentFormProps) => {
  const { id } = props;
  const [content, setContent] = useState<string>('');
  const [sending, setSinding] = useState<boolean>(false);
  const uid = useSelector((state: RootState) => state.user.uid);
  const photoURL = useSelector((state: RootState) => state.user.photoURL)
  const displayName = useSelector((state: RootState) => state.user.displayName);
  const classes = useStyles();

  const inputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const addComment = async () => {
    if (!content || sending) return;
    setSinding(true);
    const postRef = db.collection('posts').doc(id);
    const docRef = await postRef.get();
    const docData = docRef.data() as firebasePost;
    await postRef.set({
      comments: [
        ...docData.comments,
        {
          uid,
          displayName,
          photoURL,
          content
        }
      ]
    }, { merge: true })
    setSinding(false);
    setContent('');
  }

  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <TextField
          label='コメント'
          fullWidth={true}
          value={content}
          onChange={(e) => inputContent(e as React.ChangeEvent<HTMLInputElement>)}
        />
      </Box>
      <Button onClick={addComment} position='center' label='コメントを送信' />
    </Box>
  )
}

export default CommentForm;