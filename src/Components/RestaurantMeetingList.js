import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import SearchButton from "../Pages/SearchButton";
import TestComponent from "../Pages/TestComponent";
// import StarRatings from './react-star-ratings';

class RestaurantMeetingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    let meetingInfos = this.props.meetingsInfos;
    let restaurantInfo = this.props.clickMarkerRestaurantInfo;
    return (
      <Fragment>
        {restaurantInfo ? (
          <div id="meetingListContainer">
            <div id="meeting-box">
              <div id="restauranteInfo">
                <div id="restaurantInfo-name">
                  <h1>{restaurantInfo.name}</h1>
                </div>
                <p>{restaurantInfo.formatted_address}</p>
                <p>{restaurantInfo.formatted_phone_number}</p>
                <a href="{restaurantInfo.website}">{restaurantInfo.website}</a>
              </div>

              <div id="meeting-state-Info">
                <div>
                  <h3>현재 모임</h3>
                </div>
                {meetingInfos.activeMeetings.length > 0 ? (
                  meetingInfos.activeMeetings.map((meeting, index) => (
                    <div id="current-meeting">
                      <div
                        className="meeting-button"
                        key={meeting.meetingId}
                        index={meeting.meetingId}
                        onClick={() =>
                          this.props.getMeetingDetail(
                            meeting.placeId,
                            meeting.meetingId
                          )
                        }
                      >
                        <div>
                          <strong>{meeting.meetingName}</strong>
                        </div>
                        <div>{meeting.meetingTime}</div>
                        <div>
                          {meeting.numberOfMembers + "/" + meeting.limit}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>참여 가능한 모임이 없습니다.</div>
                )}
                <Button
                  id="meeting-create-button"
                  variant="outlined"
                  color="primary"
                  onClick={this.props.getNewMeetingModal}
                >
                  모임생성
                </Button>

                <div>
                  <h3>지난 모임</h3>
                </div>
                {meetingInfos.inActiveMeetings.length > 0 ? (
                  meetingInfos.inActiveMeetings.map((meeting, index) => (
                    <div
                      className="meeting-button"
                      key={meeting.meetingId}
                      index={meeting.meetingId}
                    >
                      <div>
                        <strong>{meeting.meetingName}</strong>
                      </div>
                      <div>{meeting.meetingTime}</div>
                      <div>{meeting.numberOfMembers + "/" + meeting.limit}</div>
                    </div>
                  ))
                ) : (
                  <div>지난 모임이 없습니다.</div>
                )}
                <Button
                  id="meeting-list-backbutton"
                  variant="outlined"
                  color="primary"
                  onClick={this.props.backToMeetingList}
                >
                  리스트로 이동
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default RestaurantMeetingList;
