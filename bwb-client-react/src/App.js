import React, { Component } from "react";
import Search from "./Components/Search";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: { id: "", pw: "", nick_name: "", gender: "" },
      login_event: false,
      signup_event: false
    };
  }

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
          console.log(user);
          fetch("http://localhost:3000/signup", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response)
            .catch(err => {
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
        onSubmit={function(_id, _pw) {
          this.setState({
            user: { id: _id, pw: _pw, nick_name: "", gender: "" } //디비에서 해당 아이디가 가지고 있는 닉네임과 젠더 불러오기
          });
        }.bind(this)}
      />
    );

    return _loginUser;
  };

  onSignup = value => {
    console.log(value);
    this.setState({
      signup_event: value,
      login_event: false
    });
  };
  onLogin = value => {
    console.log(value);
    this.setState({
      login_event: value,
      signup_event: false
    });
  };
  render() {
    console.log(this.state.user);
    console.log(this.state.login_event);
    console.log(this.state.signup_event);
    return (
      <div className="App">
        <Search onSignup={this.onSignup} onLogin={this.onLogin} />

        {this.state.signup_event ? this.signup() : false}
        {this.state.login_event ? this.login() : false}
      </div>
    );
  }
}

export default App;
