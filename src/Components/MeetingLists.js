import React from "react";

const MeetingLists = props => {
  return (
    <div id="meetingListContainer">
      {props.meetingListToRender.map(aList => (
        <button
          className="meetingListBtn"
          key={aList.meetingId}
          index={aList.meetingId}
          onClick={() => props.getMeetingDetail(aList.placeId, aList.meetingId)}
        >
          <div>
            <strong>{props.reataurantname}</strong>
          </div>
          <div>
            <strong>{aList.meetingName}</strong>
          </div>
          <div>{aList.meetingTime}</div>
          <div>{aList.numberOfMembers + "/" + aList.limit}</div>
        </button>
      ))}
    </div>
  );
};

export default MeetingLists;
