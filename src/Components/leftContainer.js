import React from "react";
import MeetingLists from "./MeetingLists";

const LeftContainer = props => {
  console.log(props.fetchedMeetingList);
  return (
    <div>
      {props.fetchedMeetingList ? (
        <div>
          <MeetingLists
            meetingListToRender={props.fetchedMeetingList}
            reataurantname={props.reataurantname}
            getMeetingDetail={props.getMeetingDetail}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LeftContainer;
