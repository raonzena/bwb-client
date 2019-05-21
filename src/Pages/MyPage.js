import React, { Component, Fragment } from "react";
import MySchedule from "../Components/MySchedule";

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentItem: null
    }
  }

  getMyPageList = () => {
    var id = localStorage.getItem("token");
    fetch(`http://localhost:3000/mypage`, {
      headers: {
        "Content-Type": "application/json",
        authorization: id
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json", json);
      this.setState = ({
        currentItem: json
      });
      return json;
    });
  };
  
  closeMyPageList = () => {
    document.querySelector(".my-page").style.display = "none";
    document.querySelector(".my-page-button").style.display = "block";
  };

  componentDidMount = () => {
    this.getMyPageList();
  }

  render() {
    return (
      <Fragment>
        {this.state.open ? ( 
        <div className="my-page">
          <div className="close-button" onClick={this.closeMyPageList}>
            X
          </div>
          <h1>나의 BWB 일정</h1>
          <div>
            <h2>내가 만든 모임 일정</h2>
            {this.state.currentItem
              ? this.state.currentItem.owner.map((meeting, index) => {
                  return <MySchedule meeting={meeting} key={index} />;
                })
              : ""}
          </div>
          <div>
            <h2>내가 참여한 모임 일정</h2>
            {this.state.currentItem
              ? this.state.currentItem.member.map((meeting, index) => {
                  return <MySchedule meeting={meeting} key={index} />;
                })
              : ""}
          </div>
        </div>
        )
        :
        <button className="my-page-button" onClick={this.getMyPageList}>MyPage</button>
        }
      </Fragment>
    );
  }
}

export default MyPage;
