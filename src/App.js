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
      searchValue: ""
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
  changeIsLogin = value => {
    this.setState({
      signCheck: value
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
      });
  };
  render() {
    console.log("app", this.state.isLogin);
    if (this.state.isLogin === null) {
      return <Loading />;
    }
    return (
      <div className="App">
        <div className="js-signApp signApp">
          <SignApp
            isLogin={this.state.isLogin}
            changeIsLogin={this.changeIsLogin}
          />
        </div>
        <div className="js-LogSign logSign">
          {this.state.signCheck === "login" ? (
            <Login
              onSubmit={(_id, _pw) => {
                var loginUser = { id: _id, pw: _pw };
                fetch("http://localhost:3000/login", {
                  method: "POST",
                  body: JSON.stringify(loginUser),
                  headers: { "Content-Type": "application/json" }
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        isLogin: true,
                        signCheck: null
                      });
                      // alert("로그인에 성공하였습니다!");
                    } else if (response.status === 204) {
                      alert("가입된 회원이 아닙니다!");
                    } else if (response.status === 409) {
                      alert("비밀번호가 일치하지 않습니다!");
                    }
                    return response.json();
                  })
                  .then(token => {
                    localStorage.setItem("token", token.token);
                  })
                  .catch(err => {
                    // console.log(err);
                    return err;
                  });
              }}
            />
          ) : (
            false
          )}
          {this.state.signCheck === "signup" ? (
            <Signup
              onSubmit={(_id, _pw, _nick_name, _gender) => {
                var user = {
                  id: _id,
                  pw: _pw,
                  nick_name: _nick_name,
                  gender: _gender
                };
                fetch("http://localhost:3000/signup", {
                  method: "POST",
                  body: JSON.stringify(user),
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                  .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                      this.setState({
                        // isLogin: true,
                        signCheck: "login"
                      });
                      // onLogSign(false);
                      alert("정상적으로 회원가입 되었습니다!");
                      return response;
                    }

                    return response;
                  })
                  .catch(err => {
                    alert("회원가입에 실패하였습니다!");
                    console.log(err);
                    return err;
                  });
              }}
            />
          ) : (
            false
          )}
          {this.state.signCheck === "logout" ? (
            <Logout
              onLogout={() => {
                var token = localStorage.getItem("token");
                fetch("http://localhost:3000/logout", {
                  method: "GET",
                  headers: {
                    authorization: token
                  }
                })
                  .then(response => {
                    if (response.status === 201) {
                      localStorage.removeItem("token");
                      this.setState({
                        isLogin: false,
                        signCheck: null
                      });
                      document.querySelector(".my-page-button").style.display =
                        "none";
                      document.querySelector(".my-page").style.display = "none";
                      // alert("로그아웃 되었습니다");
                      return response;
                    }
                    return response;
                  })
                  .catch(err => {
                    alert("로그아웃에 실패했습니다");
                    console.log(err);
                    return err;
                  });
              }}
            />
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