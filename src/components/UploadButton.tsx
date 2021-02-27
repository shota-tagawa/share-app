import React from 'react';
import AddPhoteIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';

interface UploadButtonProps {
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}

const UploadButton = (props: UploadButtonProps) => {
  return (
    <IconButton>
      <label>
        <AddPhoteIcon />
        <input
          onChange={props.onChange}
          type="file"
          style={{ display: "none" }}
        />
      </label>
    </IconButton>
  )
}

export default UploadButton;