import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    paddingTop: '87.464%',
  }
})

interface PicProps {
  src: string
}

const Pic = (props: PicProps) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${props.src})` }}
    />
  )
}

export default Pic;
