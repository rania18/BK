import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmModal(props) {
 
  if(!props.show) {
      return null
  } else {
    return (
          <Dialog
            open={props.show}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{ props.title }</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                { props.qst }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose} color="primary">
                No
              </Button>
              <Button onClick={props.onConfirm} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
      );
  }
}
