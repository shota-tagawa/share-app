import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOut } from '../store/user';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import logo from '../assets/imgs/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
    fontSize: "1rem"
  },
  appBar: {
    boxShadow: "none",
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc'
  },
  toolBar: {
    maxWidth: 760,
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

  const signOut = () => {
    const signOutConfirm = window.confirm('ログアウトしますか？');
    if (signOutConfirm) {
      dispatch(authSignOut())
    } else {
      return;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color='default'>
        <Toolbar className={classes.toolBar}>
          <figure className={classes.logo}>
            <img onClick={() => { isSignIn && dispatch(push('/home')) }} src={logo}></img>
          </figure>
          {isSignIn && (
            <IconButton
              onClick={signOut}
              edge="start"
              className={classes.signOutButton}
              color="inherit"
            >
              <ExitIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;