import React, { Component } from "react";

const activationFilter = meetingListArr => {
  let result = {};
  let activeMeetings = [];
  let inActiveMeetings = [];
  meetingListArr.sort(function(a, b) {
    return (
      Number(a.meetingTime.slice(11, 13)) - Number(b.meetingTime.slice(11, 13))
    );
  });
  meetingListArr.forEach(e => {
    if (e.isActive) {
      activeMeetings.push(e);
    } else {
      inActiveMeetings.push(e);
    }
  });
  result.activeMeetings = activeMeetings;
  result.inActiveMeetings = inActiveMeetings;
  return result;
};

class MeetingLists extends Component {
  state = {
    meetingsInfos: []
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
    console.log(this.state.meetingsInfos);
    console.log(this.props);
    return (
      <div id="meetingListContainer">
        {!this.state.meetingsInfos || this.state.meetingsInfos.length !== 0 ? (
          <div>
            <div id="activeMeetings">
              {activationFilter(
                this.state.meetingsInfos.result
              ).activeMeetings.map(aList => (
                <button
                  className="meetingListBtn"
                  key={aList.meetingId}
                  index={aList.meetingId}
                >
                  <div>
                    <strong>{aList.meetingName}</strong>
                  </div>
                  <div>{aList.meetingTime}</div>
                  <div>{aList.numberOfMembers + "/" + aList.limit}</div>
                </button>
              ))}
            </div>
            <div id="activeMeetings">
              {activationFilter(
                this.state.meetingsInfos.result
              ).inActiveMeetings.map(aList => (
                <button
                  className="meetingListBtn"
                  key={aList.meetingId}
                  index={aList.meetingId}
                >
                  <div>
                    <strong>{aList.meetingName}</strong>
                  </div>
                  <div>{aList.meetingTime}</div>
                  <div>{aList.numberOfMembers + "/" + aList.limit}</div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MeetingLists;
