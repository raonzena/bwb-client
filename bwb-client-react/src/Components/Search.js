import React, { Component } from "react";

class Search extends Component {
  render() {
    const onSignup = this.props.onSignup;
    const onLogin = this.props.onLogin;

    return (
      <div>
        <input type="text" />
        <button
          className="signup-button"
          onClick={e => {
            e.stopPropagation();
            onSignup(true);
          }}
        >
          회원가입
        </button>
        <button
          className="login-button"
          onClick={e => {
            e.stopPropagation();
            onLogin(true);
          }}
        >
          로그인
        </button>
      </div>
    );
  }
}

export default Search;
