import React from 'react';
import { makeStyles } from '@material-ui/core';
import MaterialTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  textField: {
    backgroundColor: '#fff',
  },
})

interface TextFieldProps {
  fullWidth?: boolean,
  rows?: number
  multiline?: boolean,
  label?: string,
  value: any,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  mt?: number,
  mb?: number,
  type?: string
}

const TextField = (props: TextFieldProps) => {
  const classes = useStyles();
  const { fullWidth, rows, multiline, label, value, onChange, mt, mb, type } = props;

  return (
    <Box
      mt={mt}
      mb={mb}
    >
      <MaterialTextField
        fullWidth={fullWidth}
        rows={rows}
        label={label}
        value={value}
        multiline={multiline}
        onChange={onChange}
        type={type}
        className={classes.textField}
      />
    </Box>
  )
}

export default TextField;