import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MySchedule from "../Components/MySchedule";
// import MyPage from './MyPage';

class MyPageButton extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.getMyPageList()
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  closeMyPageList = () => {
    document.querySelector(".my-page").style.display = "none";
    document.querySelector(".my-page-button").style.display = "block";
  };

  render() {
    // console.log(this.props)
    return (
      <Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}  >
          MyPage
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">나의 BWB 일정</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
              {/* 마이페이지 내용들어가는 곳 = <MyPage/> */}
        
          🥢 내가 만든 모임 일정
          {this.props.currentItem.owner
            ? this.props.currentItem.owner.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : ""}
        
          <br/>
          🥢 내가 참여한 모임 일정
          {this.props.currentItem.member
            ? this.props.currentItem.member.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : ""}

            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default MyPageButton;
