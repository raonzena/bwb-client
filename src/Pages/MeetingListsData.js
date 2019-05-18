import React, { Component } from "react";
import MeetingList_Data from "./MeetingList_Data";
class MeetingListsData extends Component {
  state = {
    meetingsInfos: null
  };

  init = () => {
    var p = Promise.resolve(this.props.meetingsInfos);

    p.then(meetingLists => {
      this.setState({
        meetingsInfos: meetingLists
      });
    });
  };

  componentDidMount = () => {
    this.init();
  };

  render() {
    const { meetingsInfos } = this.state;
    // console.log(this.state.meetingsInfos, 'meeting state')
    return (
      <div>
        {meetingsInfos
          ? meetingsInfos.result.map((ele, idx) => (
              <MeetingList_Data info={ele} key={idx} />
            ))
          : null}
      </div>
    );
  }
}

export default MeetingListsData;
