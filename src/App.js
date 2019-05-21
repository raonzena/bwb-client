import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./ReactRoutes/Main";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Header from "./Headers/Header";
import Logout from "./Components/Logout";
import MapHouse from "./Pages/MapHouse";
import MainSearch from "./Pages/MainSearch";
import MyPage from "./Pages/MyPage";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      currentItem: {}
    };
  }
  handleSearch = e => {
    if (e.key === "Enter") {
      if( !e.target.value.length ){
        alert(' 지역을 입력하세요! ')
      }else{ 
        let data = e.target.value;
        e.target.value = '';
        this.setState({
          searchValue: data,
        });
      }
    }
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
      });
  };
  render() {
    return (
      <Router>
        <div className="Whole-Scene">
          
            <Header />
            
          
            <Route exact path="/" component={Main} />
            <Route exact path="/maphouse" component={MainSearch} redn />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {/* <Route path="/maphouse" component={MapHouse} /> */}
          <MainSearch className="Search-House" handleSearch={this.handleSearch} />
          <div className="Bodys">
            {this.state.searchValue !== undefined ? (
              <MapHouse searchValue={this.state.searchValue} />
            ) : (
              false
            )}
            {/* <MapHouse searchValue={this.state.searchValue} /> */}
            <div>
              <button className="my-page-button" onClick={this.getMyPageList}>
                MyPage
              </button>
              <MyPage currentItem={this.state.currentItem} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
