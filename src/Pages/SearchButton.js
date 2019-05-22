import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class SearchButton extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Search...
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"쏙았지?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              클릭할 시간에 코드한줄 더짜자
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              닫기
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              열기
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default SearchButton;
