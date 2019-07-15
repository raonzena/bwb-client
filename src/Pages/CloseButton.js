import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 0,
    padding: 0,
  },
};


class CloseButton extends Component {
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
        <Button variant="outlined" color='primary' onClick={this.props.closeModal} style={{ fontSize: 20, margin:0, background: grey[50]}} >
          {this.props.buttonName}
        </Button>
      </Fragment>
    );
  }
}
export default withStyles(styles)(CloseButton);
// export default SearchButton;
