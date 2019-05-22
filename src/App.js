import React, { Component } from "react";
import "./App.css";
import MapHouse from "./Pages/MapHouse";
import SignApp from "./SignApp";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
import MainSearch from "./Pages/MainSearch";
import MyPage from "./Pages/MyPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      signCheck: null,
      currentItem: {},
      searchValue: "",
      myPageFalg: null
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isLogin: true
      });
    } else {
      this.setState({
        isLogin: false
      });
    }
  };
  handleSearch = e => {
    if (e.key === "Enter") {
      this.setState({
        searchValue: e.target.value
      });
    }
  };
  changeIsButton = value => {
    this.setState({
      signCheck: value
    });
  };
  changeIsLogin = (flag, value, pageFlage) => {
    this.setState({
      signCheck: flag,
      isLogin: value,
      myPageFalg: pageFlage
    });
  };
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
        this.setState({
          currentItem: json
        });
        document.querySelector(".my-page").style.display = "block";
        document.querySelector(".my-page-button").style.display = "none";
      })
      .catch(err => {
        return err;
      });
  };
  render() {
    console.log("app", this.state.isLogin);
    if (this.state.isLogin === null) {
      return <Loading />;
    }
    return (
      <div className="App">
        <button className="home-button">홈버튼</button>
        <div className="js-signApp signApp">
          <SignApp
            isLogin={this.state.isLogin}
            changeIsButton={this.changeIsButton}
          />
        </div>
        <div className="js-LogSign logSign">
          {this.state.signCheck === "login" ? (
            <Login changeIsLogin={this.changeIsLogin} />
          ) : (
            false
          )}
          {this.state.signCheck === "signup" ? (
            <Signup changeIsLogin={this.changeIsLogin} />
          ) : (
            false
          )}
          {this.state.signCheck === "logout" ? (
            <Logout changeIsLogin={this.changeIsLogin} />
          ) : (
            false
          )}
        </div>
        <MainSearch handleSearch={this.handleSearch} />
        {this.state.searchValue !== undefined ? (
          <MapHouse searchValue={this.state.searchValue} />
        ) : (
          false
        )}
        <button className="my-page-button" onClick={this.getMyPageList}>
          MyPage
        </button>
        <MyPage currentItem={this.state.currentItem} />
      </div>
    );
  }
}

export default App;
