import React from "react";

class MeetingLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.maxContentsNum = 6; //페이지 당 리스트 수
  }
  createMeetingListBtnByPage = () => {
    let totalMeetingLists = [].concat(
      this.props.filteredMeetingLists.activeMeetings,
      this.props.filteredMeetingLists.inActiveMeetings
    );
    let meetingBtnArr = [];
    for (
      let i = (this.state.currentPage - 1) * this.maxContentsNum;
      i < this.state.currentPage * this.maxContentsNum;
      i++
    ) {
      if (totalMeetingLists[i]) {
        let aList = totalMeetingLists[i];
        if (totalMeetingLists[i].isActive) {
          meetingBtnArr.push(
            <button
              className="active meetingListsBtn"
              key={aList.meetingId}
              index={aList.meetingId}
              onClick={() =>
                this.props.getMeetingDetail(aList.placeId, aList.meetingId)
              }
            >
              <div>{aList.meetingTime}</div>

              <div className="displayMeetingName">
                <strong>{aList.meetingName}</strong>
              </div>
              <div>
                <strong>{aList.restaurantName}</strong>
              </div>
              <div className="numOfParticipantsContainer">
                <img
                  className="numOfParticipants"
                  src="https://i.ibb.co/pyW3HKh/baseline-people-outline-white-18dp.png"
                  alt="baseline-people-outline-pink"
                />
                <span className="numberText">
                  {aList.numberOfMembers + " / " + aList.limit}
                </span>
              </div>
            </button>
          );
        } else {
          meetingBtnArr.push(
            <button
              className="inactive meetingListsBtn"
              key={aList.meetingId}
              index={aList.meetingId}
              onClick={() => alert("종료된 모임입니다.")}
            >
              <div>{aList.meetingTime}</div>
              <div className="displayMeetingName">
                <strong>{aList.meetingName}</strong>
              </div>
              <div>
                <strong>{aList.restaurantName}</strong>
              </div>
              <div className="numOfParticipantsContainer">
                <img
                  className="numOfParticipants"
                  src="https://i.ibb.co/pyW3HKh/baseline-people-outline-white-18dp.png"
                  alt="baseline-people-outline-pink"
                />
                <span className="numberText">
                  {aList.numberOfMembers + " / " + aList.limit}
                </span>
              </div>
            </button>
          );
        }
      }
    }
    return meetingBtnArr;
  };

  pageHandler = idx => {
    this.setState({
      currentPage: idx
    });
  };

  createPageBtn = () => {
    let numOfMeetings = this.numOfMeetingLists();
    let pageBtnArr = [];
    for (let i = 0; i < Math.ceil(numOfMeetings / this.maxContentsNum); i++) {
      pageBtnArr.push(
        <button
          className="pageBtn"
          key={i + 1}
          index={i + 1}
          onClick={e => this.pageHandler(Number(e.target.innerHTML))}
        >
          {i + 1}
        </button>
      );
    }
    return pageBtnArr;
  };

  numOfMeetingLists = () => {
    return (
      this.props.filteredMeetingLists.activeMeetings.length +
      this.props.filteredMeetingLists.inActiveMeetings.length
    );
  };

  render() {
    return (
      <div className="displayMeetingLists">
        <div className="meetingLists">
          {this.props.filteredMeetingLists.activeMeetings ||
          this.props.filteredMeetingLists.inActiveMeetings
            ? this.createMeetingListBtnByPage()
            : null}
        </div>
        <div className="pageBtnContainer">
          {this.numOfMeetingLists() > this.maxContentsNum
            ? this.createPageBtn()
            : null}
        </div>
      </div>
    );
  }
}

export default MeetingLists;
