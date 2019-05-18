import React, { Component } from "react";

class MySchedule extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let reservation_time = new Date(this.props.meeting.reservation_time);
    let year = reservation_time.getFullYear();
    let month = reservation_time.getMonth();
    let date = reservation_time.getDate();
    let hours = reservation_time.getHours();
    let minutes =
      reservation_time.getMinutes() < 10
        ? "0" + reservation_time.getMinutes()
        : reservation_time.getMinutes();

    return (
      <ul>
        <li>{this.props.meeting.restaurant_name}</li>
        <li>
          {year}-{month}-{date} {hours}:{minutes}
        </li>
        <li>
          {this.props.meeting.member_count}/{this.props.meeting.limit}명
        </li>
      </ul>
    );
  }
}

export default MySchedule;
