import React, { Component } from "react";
import Search from "./Components/Search";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Loading from "./Components/Loading";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      user: { id: "", pw: "", nick_name: "", gender: "" },
      logsign_flag: null
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
  signup = () => {
    // 회원가입 컴포넌트에서 값을 받아오는 함수
    var _user;
    _user = (
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
              this.setState({
                logsign_flag: null
              });
              alert("정상적으로 회원가입 되었습니다!");
              return response;
            })
            .catch(err => {
              alert("회원가입에 실패하였습니다!");
              console.log(err);
            });
        }}
      />
    );

    return _user;
  };

  login = () => {
    var _loginUser;
    // if문으로 id와 pw가 디비에 저장된 것과 일치하는지 확인해야함 / 로그인에 성공하면 isLogin true로 변경
    _loginUser = (
      <Login
        onSubmit={(_id, _pw) => {
          var loginUser = { id: _id, pw: _pw };

          fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(loginUser),
            headers: { "Content-Type": "application/json" }
          })
            .then(response => {
              this.setState({
                isLogin: true
              });
              alert("로그인에 성공하였습니다!");
              return response.json();
            })
            .then(token => {
              localStorage.setItem("token", token);
            })
            .catch(err => {
              console.log(err);
              alert("로그인에 실패했습니다!");
            });
        }}
      />
    );

    return _loginUser;
  };

  logout = () => {
    console.log("로그아웃");
    var token = localStorage.getItem("token");

    localStorage.removeItem("token");
    this.setState({
      logsign_flag: null,
      isLogin: false
    });
    alert("정상적으로 로그아웃 되었습니다!");

    // fetch("http://localhost:3000/logout", {
    //   method: "GET",
    //   body: token
    // })
    //   .then(response => {
    //     this.setState({
    //       signup_event: false
    //     });
    //     alert("정상적으로 로그아웃 되었습니다!");
    //     return response;
    //   })
    //   .catch(err => {
    //     alert("로그아웃에 실패했습니다!");
    //     console.log(err);
    //   });
  };

  onLogSign = value => {
    this.setState({
      logsign_flag: value
    });
  };

  render() {
    if (this.state.isLogin === null) {
      return <Loading />;
    } else if (this.state.isLogin === false) {
      return (
        <div className="App">
          <Search onLogSign={this.onLogSign} />

          {this.state.logsign_flag !== null
            ? this.state.logsign_flag
              ? this.signup()
              : this.login()
            : false}
        </div>
      );
    } else if (this.state.isLogin === true) {
      return (
        <div className="App">
          <Search
            onLogSign={this.onLogSign}
            logoutCheck={this.state.isLogin}
            logout={this.logout}
          />
        </div>
      );
    }
  }
}

export default App;
