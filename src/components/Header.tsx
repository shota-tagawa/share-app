import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOut } from '../store/user';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import logo from '../assets/imgs/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
    fontSize: "1rem"
  },
  appBar: {
    boxShadow: "none"
  },
  toolBar: {
    maxWidth: 700,
    width: "100%",
    margin: "0 auto",
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  },
  logo: {
    maxWidth: 140,
    width: '100%',
    cursor: 'pointer'
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color='default'>
        <Toolbar className={classes.toolBar}>
          <figure className={classes.logo}>
            <img onClick={() => { isSignIn && dispatch(push('/home')) }} src={logo}></img>
          </figure>
          <IconButton onClick={() => { dispatch(authSignOut()) }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;