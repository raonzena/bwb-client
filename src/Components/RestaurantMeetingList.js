import React, {Component} from "react";
import StarRatings from './react-star-ratings';


class RestaurantMeetingList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let meetingInfos = this.props.meetingsInfos.result;
    let restaurantInfo = this.props.clickMarkerRestaurantInfo;
    console.log(restaurantInfo)
    return (
      <div id="meetingListContainer">
        <div>
          <h1>{restaurantInfo.name}</h1>
          <p>{restaurantInfo.formatted_address}</p>
          <p>{restaurantInfo.formatted_phone_number}</p>
          <a href="{restaurantInfo.website}">{restaurantInfo.website}</a>
        </div>
        <div>
          { meetingInfos.length > 0 ? (
            meetingInfos.map((meeting, index) => 
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
        </div>
      </div>
    );
  }
}

export default RestaurantMeetingList;

