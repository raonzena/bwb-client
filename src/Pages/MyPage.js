import React, { Component } from "react";
import MySchedule from "../Components/MySchedule";

class MyPage extends Component {
  closeMyPageList = () => {
    document.querySelector(".my-page").style.display = "none";
    document.querySelector(".my-page-button").style.display = "block";
  };

  render() {
    return (
      <div className="my-page">
        <div className="close-button" onClick={this.closeMyPageList}>
          X
        </div>
        <h1>나의 BWB 일정</h1>
        <div>
          <h2>내가 만든 모임 일정</h2>
          {this.props.currentItem.owner
            ? this.props.currentItem.owner.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : ""}
        </div>
        <div>
          <h2>내가 참여한 모임 일정</h2>
          {this.props.currentItem.member
            ? this.props.currentItem.member.map((meeting, index) => {
                return <MySchedule meeting={meeting} key={index} />;
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default MyPage;