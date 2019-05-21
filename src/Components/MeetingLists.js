import React from "react";

const MeetingLists = (props) => {
  return (
    <div id="meetingLists">
      <div id="activeMeetingsList">
        {props.filteredMeetingLists.activeMeetings ?
          (props.filteredMeetingLists.activeMeetings.map(aList => (
            <button
              className="meetingListBtn"
              key={aList.meetingId}
              index={aList.meetingId}
              onClick={() => props.getMeetingDetail(aList.placeId, aList.meetingId)}
            >
              <div>
                <strong>{aList.meetingName}</strong>
              </div>
              <div>
                <strong>{aList.restaurantName}</strong>
              </div>
              <div>{aList.meetingTime}</div>
              <div>{aList.numberOfMembers + "/" + aList.limit}</div>
            </button>
          )))
          : null
        }
      </div>
      <div id="inActiveMeetingsList">
        {props.filteredMeetingLists.inActiveMeetings.length ?
          (props.filteredMeetingLists.inActiveMeetings.map(aList => (
            <button
              className="meetingListBtn"
              key={aList.meetingId}
              index={aList.meetingId}
            >
              <div>
                <strong>{aList.meetingName}</strong>
              </div>
              <div>
                <strong>{aList.restaurantName}</strong>
              </div>
              <div>{aList.meetingTime}</div>
              <div>{aList.numberOfMembers + "/" + aList.limit}</div>
            </button>
          )))
          : null}
      </div>
    </div >
  );
}

export default MeetingLists;
