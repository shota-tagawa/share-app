import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16
  },
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80
    },
  },
  name: {
    marginLeft: 16,
    lineHeight: 1,
    fontWeight: 'bold',
  }
}));

interface userHeaderProps {
  children?: React.ReactNode,
  src: string,
  name: string,
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined
}

const UserHeader = (props: userHeaderProps) => {
  const { children, src, name, onClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={onClick}>
      <Avatar className={classes.avatar} src={src} />
      <p className={classes.name}>{name}</p>
      {children}
    </div>
  )
}

export default UserHeader;