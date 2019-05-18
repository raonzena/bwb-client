import React, { Component } from "react";

class MeetingList_Data extends Component {
  render() {
    // console.log(this.props, 'meeting Props')
    return (
      <div>
        {"미팅이름쓰 짞짝 => 장소아뒤: " +
          this.props.info.placeId +
          "미팅이름: " +
          this.props.info.meetingName}
      </div>
    );
  }
}

export default MeetingList_Data;
