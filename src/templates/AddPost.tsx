import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { db, storage } from '../firebase';
import { RootState } from '../store';
import styles from '../assets/common.module.scss';
import { UploadButton, Button, Pic } from '../components';
import TextField from '@material-ui/core/TextField';
import AddPhoteIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';

const AddPost = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);

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
    if (!image) {
      return;
    }
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const strLength = 24;
    const id = Array.from(Array(strLength)).map(() => str[Math.floor(Math.random() * str.length)]).join('');
    const timestamp = Date.now() / 1000;


    const snapshot = await storage.ref().child(id).put(image);
    const url = await snapshot.ref.getDownloadURL();
    await db.collection('posts').doc(id).set({
      id,
      url,
      description,
      timestamp,
      poster: uid,
      likeUsers: []
    }).catch(() => {
      alert('画像のアップロードに失敗しました。')
    });
    dispatch(push('/home'));
  }


  return (
    <>
      <h2 className={styles.heading}>新規投稿</h2>
      <div>
        {image && (
          <Pic src={thumbnail} />
        )}
        <div className={styles.formItem}>
          <UploadButton onChange={(e) => inputImage(e)} />
        </div>
        <div className={styles.formItem}>
          <TextField
            value={description}
            onChange={(e) => { inputDescription(e as React.ChangeEvent<HTMLInputElement>); }}
            label="説明"
            multiline={true}
            rows={4}
            fullWidth={true}
          />
        </div>
        <Button onClick={upload} label="投稿する" />
      </div>
    </>
  );
}

export default AddPost;