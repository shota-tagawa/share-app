import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 16
  },
  avatar: {
    cursor: 'pointer'
    // [theme.breakpoints.up('md')]: {
    //   width: 60,
    //   height: 60
    // },
  },
  body: {
    marginLeft: 16,
  },
  name: {
    lineHeight: 1,
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 11,
  }
}));

interface CommentProps {
  src?: string,
  displayName: string,
  content: string,
  uid: string,
}

const Comment = (props: CommentProps) => {
  const { uid, src, displayName, content } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  

  return (
    <Box className={classes.root} mb={1}>
      <Avatar className={classes.avatar} src={src} onClick={() => dispatch(push(`profile/${uid}`))} />
      <Box className={classes.body}>
        <p className={classes.name}>{displayName}</p>
        <p>{content}</p>
      </Box>
    </Box>
  )
}

export default Comment;