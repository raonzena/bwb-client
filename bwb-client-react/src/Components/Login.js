import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h2>로그인</h2>
        <form
          className="login-form"
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(e.target.id.value, e.target.pw.value);
          }}
        >
          <p>
            아이디:
            <input type="text" name="id" placeholder="아이디" />
          </p>
          <p>
            비밀번호:
            <input type="password" name="pw" placeholder="비밀번호" />
          </p>
          <p>
            <input type="submit" value="로그인" />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
