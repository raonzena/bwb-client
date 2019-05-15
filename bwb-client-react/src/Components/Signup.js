import React, { Component } from "react";

class Signup extends Component {
  id_check = false;
  isIdCheck = id => {
    this.id_check = true;
    console.log(id);
  };

  render() {
    return (
      <div className="signup">
        <h2>회원가입</h2>
        <form
          className="signup-form"
          action="/signup"
          method="post"
          onSubmit={e => {
            e.preventDefault();
            console.log(
              // e.target.id.value,
              // e.target.pw.value,
              // e.target.nick_name.value,
              // e.target.gender.value
              e.target.id_check.value
            );
            if (this.id_check === true) {
              this.props.onSubmit(
                e.target.id.value,
                e.target.pw.value,
                e.target.nick_name.value,
                e.target.gender.value
              );
            }
          }}
        >
          <p>
            아이디:
            <input type="text" id="id" name="id" placeholder="아이디" />
            <input
              type="button"
              name="id_check"
              value="중복확인"
              onClick={e => {
                this.isIdCheck(document.querySelector("#id").value);
              }}
            />
          </p>
          <p>
            비밀번호:
            <input type="text" name="pw" placeholder="비밀번호" />
          </p>
          <p>
            닉네임:
            <input type="text" name="nick_name" placeholder="닉네임" />
          </p>
          <p>
            성별:
            <input type="radio" name="gender" value="남" />남
            <input type="radio" name="gender" value="여" />여
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    );
  }
}
export default Signup;
