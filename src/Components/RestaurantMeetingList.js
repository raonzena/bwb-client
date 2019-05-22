import React, {Component} from "react";
// import StarRatings from './react-star-ratings';


class RestaurantMeetingList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let meetingInfos = this.props.meetingsInfos;
    let restaurantInfo = this.props.clickMarkerRestaurantInfo;
    return (
      <div id="meetingListContainer">
        <div>
          <h1>{restaurantInfo.name}</h1>
          <p>{restaurantInfo.formatted_address}</p>
          <p>{restaurantInfo.formatted_phone_number}</p>
          <a href="{restaurantInfo.website}">{restaurantInfo.website}</a>
        </div>
        <div>현재 모임</div>
        <div>
          { meetingInfos.activeMeetings.length > 0 ? (
            meetingInfos.activeMeetings.map((meeting, index) => 
              <div className="meetingListBtn" key={meeting.meetingId} index={meeting.meetingId} onClick={() => this.props.getMeetingDetail(meeting.placeId, meeting.meetingId)}>
                <div><strong>{meeting.meetingName}</strong></div>
                <div>{meeting.meetingTime}</div>
                <div>{meeting.numberOfMembers + '/' + meeting.limit}</div>
              </div>
            ))
            : 
            <div>
              참여 가능한 모임이 없습니다.
            </div>
          } 
          <button onClick={this.props.getNewMeetingModal}>모임 생성</button>
          <div>지난 모임</div>
          { meetingInfos.inActiveMeetings.length > 0 ? (
            meetingInfos.inActiveMeetings.map((meeting, index) => 
              <div className="meetingListBtn" key={meeting.meetingId} index={meeting.meetingId}>
                <div><strong>{meeting.meetingName}</strong></div>
                <div>{meeting.meetingTime}</div>
                <div>{meeting.numberOfMembers + '/' + meeting.limit}</div>
              </div>
            ))
            : 
            <div>
              지난 모임이 없습니다.
            </div>
          } 
        </div>
      </div>
    );
  }
}

export default RestaurantMeetingList;

