import React, { Component } from "react";

class Search extends Component {
  render() {
    const onLogSign = this.props.onLogSign;

    const logoutCheck = this.props.logoutCheck;
    const logout = this.props.logout;
    return (
      <div>
        <input type="text" />
        {logoutCheck ? (
          false
        ) : (
          <button
            className="signup-button"
            onClick={e => {
              e.stopPropagation();
              onLogSign(true);
            }}
          >
            회원가입
          </button>
        )}

        {logoutCheck ? (
          <button
            className="logout-button"
            onClick={e => {
              e.stopPropagation();
              logout();
            }}
          >
            로그아웃
          </button>
        ) : (
          <button
            className="login-button"
            onClick={e => {
              e.stopPropagation();
              onLogSign(false);
            }}
          >
            로그인
          </button>
        )}
      </div>
    );
  }
}

export default Search;
