import React, { Component, Fragment } from "react";

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
      <Fragment>
        <div className="scheduleContents">
          <br/>
          🍾  {this.props.meeting.restaurant_name}
          <br/>
          🍾  {year}-{month}-{date} {hours}:{minutes}
          <br/>
          🍾 {this.props.meeting.member_count}/{this.props.meeting.limit}
          <br/>
        </div>
      </Fragment>
    );
  }
}

export default MySchedule;
