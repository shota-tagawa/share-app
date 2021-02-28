import React from 'react';
import MaterialButton from '@material-ui/core/Button';

interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  label: string
  position?: 'center' | 'left' | 'right'
}

const Button = (props: ButtonProps) => {
  const { label, position, onClick } = props;

  return (
    <div style={{
      textAlign: position || 'left'
    }}>
      <MaterialButton
        variant="contained"
        onClick={onClick}
      >
        {label}
      </MaterialButton>
    </div>
  )
}

export default Button;