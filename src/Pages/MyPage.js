import React, { Component, Fragment } from "react";
import MyPageContents from "../Components/MyPageContents";
import fetchHelper from "../helpers/fetch"

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null
    };
  }
  closeMyPageList = () => {
    document.querySelector(".my-page").style.display = "none";
    document.querySelector(".my-page-button").style.display = "block";
  };
  openMyPageList = () => {
    this.getMyPageList();
    document.querySelector(".my-page").style.display = "block";
    document.querySelector(".my-page-button").style.display = "none";
  }
  getMyPageList = async () => {
    var id = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      fetchHelper.getMyPageList(id)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(this)
          this.setState({
            currentItem: json
          });
        })
        .catch(err => {
          return err;
        });
    }
  };


  componentDidUpdate = (preProps) => {
    if (preProps.isLogin !== this.props.isLogin) {
      this.getMyPageList();
    }
    if (!this.props.isLogin) {
      document.querySelector(".my-page").style.display = "none";
    }
  }

  render() {
    console.log("123", this.state.currentItem)
    return (
      <Fragment>
        <button className="my-page-button" onClick={this.openMyPageList}>
          MyPage
        </button>
        <div className="my-page">
          <MyPageContents closeMyPageList={this.closeMyPageList} currentItem={this.state.currentItem} />
        </div>
      </Fragment>
    );
  }
}

export default MyPage;