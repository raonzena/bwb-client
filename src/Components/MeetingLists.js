import React from "react";

class MeetingLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1
    }
    this.maxContentsNum = 6 //페이지 당 리스트 수 
  }

  createActiveListBtnByPage = () => {
    let activeMeetingBtnArr = [];
    for (let i = (this.state.currentPage - 1) * this.maxContentsNum; i < this.state.currentPage * (this.maxContentsNum); i++) {
      console.log(i)
      if (this.props.filteredMeetingLists.activeMeetings[i]) {
        let aList = this.props.filteredMeetingLists.activeMeetings[i];
        activeMeetingBtnArr.push(
          <button
            className="meetingListBtn"
            key={aList.meetingId}
            index={aList.meetingId}
            onClick={() => this.props.getMeetingDetail(aList.placeId, aList.meetingId)}
          >
            <div>
              <strong>{aList.meetingName}</strong>
            </div>
            <div>
              <strong>{aList.restaurantName}</strong>
            </div>
            <div>{aList.meetingTime}</div>
            <div>{aList.numberOfMembers + "/" + aList.limit}</div>
          </button>)
      }
    }
    return activeMeetingBtnArr
  }

  pageHandler = (idx) => {
    this.setState({
      currentPage: idx
    })
  }

  createPageBtn = () => {
    let numOfMeetings = this.numOfMeetingLists();
    let pageBtnArr = [];
    for (let i = 0; i < Math.ceil(numOfMeetings / this.maxContentsNum); i++) {
      pageBtnArr.push(
        <button className="pageBtn" key={i + 1} index={i + 1} onClick={(e) => this.pageHandler(Number(e.target.innerHTML))}>
          {i + 1}
        </button>
      )
    }
    return pageBtnArr;
  }

  numOfMeetingLists = () => {
    return this.props.filteredMeetingLists.activeMeetings.length + this.props.filteredMeetingLists.inActiveMeetings;
  }
  render() {
    return (
      <div id="meetingLists" >
        <div id="activeMeetingsList">
          {this.props.filteredMeetingLists.activeMeetings ?
            (this.createActiveListBtnByPage())
            : null
          }
        </div>
        <div id="inActiveMeetingsList">
          {this.props.filteredMeetingLists.inActiveMeetings.length ?
            (this.props.filteredMeetingLists.inActiveMeetings.map(aList => (
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
        {this.numOfMeetingLists() > this.maxContentsNum ?
          this.createPageBtn()
          : null
        }
      </div >
    );
  }

}

export default MeetingLists;
