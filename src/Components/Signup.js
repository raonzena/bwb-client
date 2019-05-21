import React, { Component } from "react";
import Fetch from "../helpers/fetch";
let id_check = false;
let nickname_check = false;
let pwCheck = false;

let isIdCheck = id => {
  if (id === "") {
    alert("아이디를 입력해주세요!");
    return false;
  }
  Fetch.fetchSignup_IdCheck(id)
    .then(response => {
      return response.json();
    })
    .then(check => {
      if (check === 0) {
        alert("사용이 가능한 아이디 입니다");
        id_check = true;
      } else if (check >= 1) {
        alert("이미 사용중인 아이디 입니다");
      }
    })
    .catch(err => {
      console.log(err);
    });
};
let isNickNameCheck = nick_name => {
  if (nick_name === "") {
    alert("닉네임을 입력해주세요!");
    return false;
  }

  Fetch.fetchSignup_NickNameCheck(nick_name)
    .then(response => {
      return response.json();
    })
    .then(check => {
      if (check === 0) {
        alert("사용이 가능한 닉네임 입니다");
        nickname_check = true;
      } else if (check >= 1) {
        alert("이미 사용중인 닉네임 입니다");
      }
    })
    .catch(err => {
      console.log(err);
    });
};
let isPwCheck = (pw, pw_check) => {
  if (pw === "" || pw_check === "") {
    alert("비밀번호를 입력해주세요!");
    return false;
  }
  if (pw === pw_check) {
    document.querySelector(".isPwCheck").innerHTML = "비밀번호가 일치합니다";
    document.querySelector(".isPwCheck").style.display = "block";
    pwCheck = true;
  } else {
    document.querySelector(".isPwCheck").innerHTML =
      "비밀번호가 일치하지 않습니다";
    document.querySelector(".isPwCheck").style.display = "block";
  }
};
let verifyId = e => {
  id_check = false;
  var regType1 = /^[A-Za-z0-9+]{4,8}$/;

  if (regType1.test(e.target.value)) {
    document.querySelector(".verifyId").style.display = "none";
  } else {
    document.querySelector(".verifyId").style.display = "block";
  }
};
let verifyNickName = e => {
  nickname_check = false;
  var regType1 = /^[가-힣|ㄱ-ㅎ|ㅏ-ㅣ|a-zA-Z0-9+]{4,8}/gi;

  if (regType1.test(e.target.value)) {
    document.querySelector(".verifyNickName").style.display = "none";
  } else {
    document.querySelector(".verifyNickName").style.display = "block";
  }
};
let verifyPw = e => {
  pwCheck = false;
  var regType1 = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;

  if (regType1.test(e.target.value)) {
    document.querySelector(".verifyPw").style.display = "none";
  } else {
    document.querySelector(".verifyPw").style.display = "block";
  }
};
let verifyPwCheck = e => {
  pwCheck = false;
};

const Signup = ({ history }) => {
  return (
    <div className="signup">
      <h2>회원가입</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(
            document.querySelector(".isPwCheck").innerHTML ===
              "비밀번호가 일치하지 않습니다"
          );
          if (id_check === false) {
            alert("아이디 중복확인을 해주세요!");
            return false;
          }
          if (nickname_check === false) {
            alert("닉네임 중복확인을 해주세요!");
            return false;
          }
          if (pwCheck === false) {
            alert("비밀번호 확인을 해주세요!");
            return false;
          }
          if (e.target.id.value === "") {
            alert("아이디를 입력해주세요!");
            return false;
          } else if (e.target.pw.value === "") {
            alert("비밀번호를 입력해주세요!");
            return false;
          } else if (
            document.querySelector(".isPwCheck").innerHTML ===
            "비밀번호가 일치하지 않습니다"
          ) {
            alert("비밀번호가 일치하지 않습니다!");
            return false;
          } else if (e.target.nick_name.value === "") {
            alert("닉네임을 입력해주세요!");
            return false;
          } else if (e.target.gender.value === "") {
            alert("성별을 체크해주세요!");
            return false;
          } else if (
            id_check === true &&
            pwCheck === true &&
            nickname_check === true &&
            document.querySelector(".isPwCheck").innerHTML ===
              "비밀번호가 일치합니다"
          ) {
            var user = {
              id: e.target.id.value,
              pw: e.target.pw.value,
              nick_name: e.target.nick_name.value,
              gender: e.target.gender.value
            };
            // fetch("http://localhost:3000/signup", {
            //   method: "POST",
            //   body: JSON.stringify(user),
            //   headers: {
            //     "Content-Type": "application/json"
            //   }
            // })
            Fetch.fetchSignup(user)
              .then(response => {
                console.log(response.status);
                if (response.status === 201) {
                  alert("정상적으로 회원가입 되었습니다!");
                  history.push("/login");
                  return response;
                }

                return response;
              })
              .catch(err => {
                alert("회원가입에 실패하였습니다!");
                console.log(err);
                return err;
              });
          }
        }}
      >
        <p>
          아이디:
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            onChange={verifyId}
          />
          <input
            type="button"
            name="id_check"
            value="중복확인"
            onClick={e => {
              isIdCheck(document.querySelector("#id").value);
            }}
          />
          <span className="verifyId">4-8글자(한영,숫자)</span>
        </p>
        <p>
          비밀번호:
          <input
            type="password"
            id="pw"
            name="pw"
            placeholder="비밀번호"
            onChange={verifyPw}
          />
          <span className="verifyPw">
            6-20글자(영문 대소문자 최소 1개의 숫자 혹은 특수 문자 포함)
          </span>
        </p>

        <p>
          비밀번호 확인:
          <input
            type="password"
            id="pw_check"
            name="pw_check"
            placeholder="비밀번호 재입력"
            onChange={verifyPwCheck}
          />
          <input
            type="button"
            name="pw_check_button"
            value="비밀번호 확인"
            onClick={e => {
              isPwCheck(
                document.querySelector("#pw").value,
                document.querySelector("#pw_check").value
              );
            }}
          />
        </p>
        <span className="isPwCheck" />
        <p>
          닉네임:
          <input
            type="text"
            id="nick_name"
            name="nick_name"
            placeholder="닉네임"
            onChange={verifyNickName}
          />
          <input
            type="button"
            name="nickname_check"
            value="중복확인"
            onClick={e => {
              isNickNameCheck(document.querySelector("#nick_name").value);
            }}
          />
          <span className="verifyNickName">4-8글자이상(영문,숫자)</span>
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
};

export default Signup;
