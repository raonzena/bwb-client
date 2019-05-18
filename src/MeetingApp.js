import React from "react";
import "./App.css";
import fetchHelper from "./helpers/fetch";
import MeetingDetailModal from "./Components/meetingDetailModal";
import NewMeetingModal from "./Components/newMeetingModal";
import LeftContainer from "./Components/leftContainer";
//Map에서 페치한 데이터가 따라서 바꿔야 함
let index = 25;
let placeId = "ChIJpSqNvI-kfDURaGSByVR8gFw";
let placeName = "장흥식당";
class MeetingApp extends React.Component {
  state = {
    fetchedMeetingList: undefined,
    showMeetingDetailModal: false,
    showNewMeetingModal: false,
    fetchedDetail: undefined,
    fetchedNickname: undefined
  };
  componentDidMount = async () => {
    fetchHelper
      .fetchMeetingList(placeId)
      .then(response => response.json())
      .then(fetchedMeetingList =>
        this.setState({
          fetchedMeetingList: fetchedMeetingList.result
        })
      );
  };
  getMeetingDetail = (placeId, index) => {
    fetchHelper
      .fetchMeetingDetail(placeId, index)
      .then(result => result.json())
      .then(json => this.setfetchedDetail(json))
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  getNickname = () => {
    if (!localStorage.getItem("token")) {
      let response = window.confirm(
        "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (response) {
        this.props.changeIsLogin("login"); //라우터
        // alert(1); //로그인 페이지로 redirect
      }
      //   alertHelper.needToLoginAlert(); alert.js 파일 안에 있는 것 현재 사용되지 않음
    } else {
      fetchHelper
        .fetchNickname()
        .then(result => {
          if (result.status === 405) {
            let response = window.confirm(
              "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
            );
            if (response) {
              this.props.changeIsLogin("login"); //라우터
            }
          } else {
            return result; //result.json();
          }
        })
        .then(json => {
          this.setfetchedNickname(json);
        });
    }
  };

  postNewMeeting = data => {
    data.placeId = placeId;
    fetchHelper
      .createNewMeeting(data)
      .then(result => this.toggleNewMeetingModal());
  };
  setfetchedDetail = data => {
    this.setState({
      fetchedDetail: data
    });
    this.toggleMeetingDetailModal();
  };

  setfetchedNickname = data => {
    this.setState({
      fetchedNickname: data.nickname
    });
    this.toggleNewMeetingModal();
  };
  fetchHandler = (identifier, meetingId) => {
    if (!localStorage.getItem("token")) {
      let response = window.confirm(
        "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (response) {
        this.props.changeIsLogin("login"); //라우터
      }
    } else {
      if (identifier === "참가하기") {
        fetchHelper.addMember(meetingId).then(result => {
          if (result.status === 405) {
            let response = window.confirm(
              "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
            );
            if (response) {
              this.props.changeIsLogin("login"); //라우터
            }
          } else {
            this.toggleMeetingDetailModal();
          }
        });
      } else if (identifier === "참가 취소") {
        fetchHelper.cancelMember(meetingId).then(result => {
          if (result.status === 405) {
            let response = window.confirm(
              "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
            );
            if (response) {
              this.props.changeIsLogin("login"); //라우터
            }
          } else {
            this.toggleMeetingDetailModal();
          }
        });
      } else if (identifier === "모임 삭제") {
        fetchHelper.deleteMeeting(meetingId).then(result => {
          if (result.status === 405) {
            let response = window.confirm(
              "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
            );
            if (response) {
              this.props.changeIsLogin("login"); //라우터
            }
          } else {
            this.toggleMeetingDetailModal();
          }
        });
      }
    }
    //식당별 모임리스트 페이지 리렌더 필요!
  };

  toggleMeetingDetailModal = () => {
    this.setState({
      showMeetingDetailModal: !this.state.showMeetingDetailModal
    });
  };

  toggleNewMeetingModal = () => {
    this.setState({
      showNewMeetingModal: !this.state.showNewMeetingModal
    });
  };

  render = () => (
    <div className="App">
      <header className="App-header">Modal Practice</header>
      {/* <div>
        <LeftContainer
          fetchedMeetingList={this.state.fetchedMeetingList}
          reataurantname={placeName}
          getMeetingDetail={this.getMeetingDetail}
        />
      </div> */}
      <React.Fragment>
        <MeetingDetailModal
          show={this.state.showMeetingDetailModal}
          closeModal={this.toggleMeetingDetailModal}
          buttonHandler={this.fetchHandler}
          data={this.state.fetchedDetail}
        />
        <NewMeetingModal
          show={this.state.showNewMeetingModal}
          closeModal={this.toggleNewMeetingModal}
          placeName={placeName}
          nickname={this.state.fetchedNickname}
          submitNewMeeting={this.postNewMeeting}
        />
        <button
          className="mainBtn"
          id="newMeeting_Modal"
          onClick={() => this.getNickname()}
        >
          newMeeting
        </button>
      </React.Fragment>
    </div>
  );
}

export default MeetingApp;
