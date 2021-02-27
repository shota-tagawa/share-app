import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseUserProfile } from '../interface';
import { Button, UploadButton } from '../components';
import TextField from '@material-ui/core/TextField';
import styles from '../assets/common.module.scss';
import Avatar from '@material-ui/core/Avatar';
import { RootState } from '../store';
import { editProfile } from '../store/user';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80
    },
  }
}));


const ProfileEdit = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const currentSelfIntroduction = useSelector((state: RootState) => state.user.selfIntroduction);
  const currentDisplayName = useSelector((state: RootState) => state.user.displayName);
  const currentImage = useSelector((state: RootState) => state.user.photoURL);

  const [image, setImage] = useState<any>();
  const [thumbnail, setThumbnail] = useState<string>('');
  const [selfIntroduction, setSelfIntroduction] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const inputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    setImage(file);
    reader.onload = e => {
      setThumbnail(e.target!.result as string);
    }
    reader.readAsDataURL(file);
  }
  const inputDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target!.value);
  }
  const inputSelfIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelfIntroduction(e.target!.value);
  }

  useEffect(() => {
    currentDisplayName && setDisplayName(currentDisplayName);
    currentSelfIntroduction && setSelfIntroduction(currentSelfIntroduction);
  }, [])



  return (
    <>
      <h2 className={styles.heading}>プロフィール編集</h2>
      <div className={styles.flex} style={{ marginBottom: 16, alignItems: 'center' }} >
        {thumbnail ?
          (
            <Avatar className={classes.avatar} src={thumbnail} />
          ) : (
            <Avatar className={classes.avatar} src={currentImage} />
          )
        }
        <UploadButton onChange={(e) => inputImage(e)} />
      </div>
      <div className={styles.formItem}>
        <TextField
          fullWidth={true}
          label="名前"
          value={displayName}
          onChange={(e) => inputDisplayName(e as React.ChangeEvent<HTMLInputElement>)}
        />
      </div>
      <div className={styles.formItem}>
        <TextField
          fullWidth={true}
          rows={3}
          multiline={true}
          label="自己紹介文"
          value={selfIntroduction}
          onChange={(e) => inputSelfIntroduction(e as React.ChangeEvent<HTMLInputElement>)}
        />
      </div>
      <Button
        onClick={() => { dispatch(editProfile(displayName, selfIntroduction, image)) }}
        label='編集する'
      />
    </>
  )
}

export default ProfileEdit;