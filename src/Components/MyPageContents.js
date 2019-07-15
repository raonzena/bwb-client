import React, { Component, Fragment } from "react";
import MySchedule from "../components/MySchedule";
import CalendarToday from '@material-ui/icons/CalendarToday';

class MyPageContents extends Component {
  
  render() {
    const { currentItem } = this.props
    return (
      <Fragment>
        <h2 style={{'textAlign':'center'}}>나의 BWB 일정</h2>
        <div className="MySchedule">
          <div className="presentSchedule">
            <h4><CalendarToday/> 내가 만든 모임 일정</h4>
            {currentItem && currentItem.owner.length
              ? currentItem.owner.map((meeting, index) => {
                  return <MySchedule meeting={meeting} key={index} />;
                })
              : <div>내가 만든 모임이 없습니다.</div>}
          </div>
          <div className="pastSchedule">
            <h4><CalendarToday/> 내가 참여한 모임 일정</h4>
            {currentItem && currentItem.member.length
              ? currentItem.member.map((meeting, index) => {
                  return <MySchedule meeting={meeting} key={index} />;
                })
              : <div>내가 참여한 모임이 없습니다.</div>}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyPageContents;