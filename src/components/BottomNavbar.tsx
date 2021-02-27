import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { push } from 'connected-react-router';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import AccountIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    height: 45,
    backgroundColor: '#eee'
  },
}));

const BottomNavbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const uid = useSelector((state: RootState) => state.user.uid);
  const dispatch = useDispatch();


  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        onClick={() => dispatch(push('/home'))}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={() => dispatch(push('/addpost'))} icon={<AddIcon />}
      />
      <BottomNavigationAction icon={<FavoriteIcon />} />
      <BottomNavigationAction
        onClick={() => dispatch(push(`/profile/${uid}`))} icon={<AccountIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomNavbar;