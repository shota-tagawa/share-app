import React from 'react';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    }
  },
}));

interface LinkTabProps {
  label?: string;
}

const LinkTab = (props: LinkTabProps) => {
  const classes = useStyles();
  return (
    <Tab
      color='default'
      {...props}
      className={classes.root}
    />
  );
}

export default LinkTab;