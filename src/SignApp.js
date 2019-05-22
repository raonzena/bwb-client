import React, { Component } from "react";

class SignApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  getButton() {
    var _button;

    if (this.props.isLogin === false) {
      _button = (
        <div>
          <button
            className="signup-button"
            onClick={e => {
              e.stopPropagation();
              this.props.changeIsLogin("signup");
            }}
          >
            회원가입
          </button>
          <button
            className="login-button"
            onClick={e => {
              e.stopPropagation();
              this.props.changeIsLogin("login");

              // onLogSign(false);
            }}
          >
            로그인
          </button>
        </div>
      );
    } else if (this.props.isLogin === true) {
      _button = (
        <button
          className="logout-button"
          onClick={e => {
            e.stopPropagation();
            this.props.changeIsLogin("logout");

            // onLogout(true);
          }}
        >
          로그아웃
        </button>
      );
    }
    return _button;
  }
  render() {
    if (this.props.isLogin === true) {
      return this.getButton();
    } else {
      return this.getButton();
    }
  }
}

export default SignApp;
