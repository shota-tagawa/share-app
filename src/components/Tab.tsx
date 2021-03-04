import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '33.33%',
    fontSize: 14,
    textAlign: 'center',
    color: '#888'
  },
  count: {
    display: 'block',
    fontWeight: 'bold',
    padding: 4,
    color: '#000'
  }
})

interface TabProps {
  onClick?: any,
  count: number,
  title: string,
  unit: string,
  clickable?: boolean
}

const Tab = (props: TabProps) => {
  const { count, title, unit, onClick,clickable } = props;
  const classes = useStyles();
  return (
    <Box
      onClick={onClick}
      className={classes.root}
      style={{
        cursor: clickable ? 'pointer' : 'auto'
      }}
    >
      {title}
      <span className={classes.count}>{count}</span>
      {unit}
    </Box>
  )
}

export default Tab;