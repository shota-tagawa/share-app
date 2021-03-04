import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { db, storage } from '../firebase';
import { RootState } from '../store';
import { UploadButton, Button, Pic, TextField } from '../components';
import Box from '@material-ui/core/Box';

const AddPost = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);
  const [sending, setSending] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const [thumbnail, setThumbnail] = useState<any>();
  const [description, setDiscription] = useState('');

  const inputDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscription(e.target.value);
  }

  const inputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    setImage(file);
    reader.onload = e => {
      setThumbnail(e.target!.result);
    }
    reader.readAsDataURL(file);
  }

  const upload = async () => {
    if (!image || sending) {
      return;
    }
    setSending(true);
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const strLength = 24;
    const id = Array.from(Array(strLength)).map(() => str[Math.floor(Math.random() * str.length)]).join('');
    const timestamp = Date.now() / 1000;

    const imageRef = await storage.ref().child(id).put(image);
    const url = await imageRef.ref.getDownloadURL();
    await db.collection('posts').doc(id).set({
      id,
      url,
      description,
      timestamp,
      poster: uid,
      likeUsers: [],
      comments: []
    }).catch(() => {
      alert('画像のアップロードに失敗しました。')
    }).finally(() => {
      setSending(false)
    })
    dispatch(push('/home'));
  }

  return (
    <>
      <h2 className='heading'>新規投稿</h2>
      <Box>
        {image && (
          <Pic src={thumbnail} />
        )}
        <Box mb={1}>
          <UploadButton onChange={(e) => inputImage(e)} />
        </Box>
        <TextField
          value={description}
          onChange={(e) => { inputDescription(e as React.ChangeEvent<HTMLInputElement>); }}
          label="説明"
          multiline={true}
          rows={4}
          fullWidth={true}
          mb={3}
        />
        <Button
          onClick={upload}
          label="投稿する"
        />
      </Box>
    </>
  );
}

export default AddPost;