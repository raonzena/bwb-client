import React, {Component} from "react";
import fetch from "../helpers/fetch.js";


class RestaurantMeetingList extends Component {
  state = {
    meetingsInfos : []
  }
  getRestaurantMeetingList = (placeId) => {
    fetch.fetchMeetingList(placeId)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data)
      this.setState = {
        meetingInfos : data
      }
      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }
  
  render() {
    return (
      <div id="meetingListContainer">
        <div>
          <h1>{this.props.clickMarkerRestaurantInfo}</h1>
          <p>{this.props.clickMarkerRestaurantInfo}</p>
          <p>{this.props.clickMarkerRestaurantInfo}</p>
          <p>{this.props.clickMarkerRestaurantInfo}</p>
        </div>
        <div>
          { this.state.meetingsInfos.length > 0 ? (
            this.state.meetingsInfos.map((meeting, index) => 
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

