import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h2>로그인</h2>
        <form
          className="login-form"
          action="/login"
          method="post"
          onSubmit={function(e) {
            e.preventDefault();
            console.log(e.target.id.value, e.target.pw.value);
            this.props.onSubmit(e.target.id.value, e.target.pw.value);
          }.bind(this)}
        >
          <p>
            아이디:
            <input type="text" name="id" placeholder="아이디" />
          </p>
          <p>
            비밀번호:
            <input type="text" name="pw" placeholder="비밀번호" />
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
