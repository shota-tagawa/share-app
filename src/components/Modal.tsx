import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: '16px 16px 16px 16px',
      width: '100%',
      maxWidth: '85%',
      height: '100%',
      maxHeight: '80%',
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        maxWidth: 600,
      }
    },
  }),
);

interface ModalProps {
  open: boolean,
  className?: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode

}

const Modal = (props: ModalProps) => {
  const classes = useStyles();
  const { open, className, setOpen, children } = props;

  return (
    <div className={props.className}>
      <MaterialModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {children}
          </div>
        </Fade>
      </MaterialModal>
    </div>
  );
}

export default Modal;