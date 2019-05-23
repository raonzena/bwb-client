import React, { Component, Fragment } from "react";
import MySchedule from "../Components/MySchedule";

class MyPageContents extends Component {
  
  render() {
    return (
      <Fragment>
        <div className="close-button" onClick={this.props.closeMyPageList}>
          X
        </div>
        <h1>나의 BWB 일정</h1>
        <div>
          <h2>내가 만든 모임 일정</h2>
          {this.props.currentItem && this.props.currentItem.owner
            ? this.props.currentItem.owner.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : <div>내가 만든 모임이 없습니다.</div>}
        </div>
        <div>
          <h2>내가 참여한 모임 일정</h2>
          {this.props.currentItem && this.props.currentItem.member
            ? this.props.currentItem.member.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : <div>내가 참여한 모임이 없습니다.</div>}
        </div>
      </Fragment>
    );
  }
}

export default MyPageContents;