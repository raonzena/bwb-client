import React, { Component } from "react";

class Signup extends Component {
  id_check = false;
  nickname_check = false;
  isIdCheck = id => {
    fetch(`http://localhost:3000/id/check?id=${id}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(check => {
        if (check === 0) {
          alert("사용이 가능한 아이디 입니다");
          this.id_check = true;
        } else if (check >= 1) {
          alert("이미 사용중인 아이디 입니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  isNickNameCheck = nick_name => {
    fetch(`http://localhost:3000/nickname/check?nick_name=${nick_name}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(check => {
        if (check === 0) {
          alert("사용이 가능한 닉네임 입니다");
          this.nickname_check = true;
        } else if (check >= 1) {
          alert("이미 사용중인 닉네임 입니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
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
            // console.log(
            //   // e.target.id.value,
            //   // e.target.pw.value,
            //   // e.target.nick_name.value,
            //   // e.target.gender.value
            //   // e.target.id_check.value
            // );
            if (this.id_check === false) {
              alert("아이디 중복확인을 해주세요!");
            }
            if (this.nickname_check === false) {
              alert("닉네임 중복확인을 해주세요!");
            }
            if (
              e.target.id.value === "" ||
              e.target.pw.value === "" ||
              e.target.nick_name.value === "" ||
              e.target.gender.value === ""
            ) {
              alert("빈칸으로 제출할 수 없습니다!");
            }
            if (this.id_check === true && this.nickname_check === true) {
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
            <input type="password" name="pw" placeholder="비밀번호" />
          </p>
          <p>
            닉네임:
            <input
              type="text"
              id="nick_name"
              name="nick_name"
              placeholder="닉네임"
            />
            <input
              type="button"
              name="nickname_check"
              value="중복확인"
              onClick={e => {
                this.isNickNameCheck(
                  document.querySelector("#nick_name").value
                );
              }}
            />
          </p>
          <p>
            성별:
            <input type="radio" name="gender" value="0" />남
            <input type="radio" name="gender" value="1" />여
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
