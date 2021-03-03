import React from 'react';
import MaterialButton from '@material-ui/core/Button';

interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  label: string
  position?: 'center' | 'left' | 'right'
  className?: string
}

const Button = (props: ButtonProps) => {
  const { label, position, onClick, className } = props;

  return (
    <div
      style={{ textAlign: position || 'left' }}
      className={className}
    >
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