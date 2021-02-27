import React from 'react';
import MaterialButton from '@material-ui/core/Button';

interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  label: string
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <MaterialButton
        variant="contained"
        onClick={props.onClick}
      >
        {props.label}
      </MaterialButton>
    </div>
  )
}

export default Button;