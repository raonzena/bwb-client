import React from "react";
import "../Headers/Header.css";
import Fetch from "../helpers/fetch";
const Login = ({ history }) => {
  return (
    <div className="login">
      <h2>로그인</h2>
      <form
        className="login-form"
        onSubmit={
          e => {
            e.preventDefault();
            if (e.target.id.value === "") {
              alert("아이디를 입력해주세요!");
              return false;
            } else if (e.target.pw.value === "") {
              alert("비밀번호를 입력해주세요!");
              return false;
            } else {
              var loginUser = {
                id: e.target.id.value,
                pw: e.target.pw.value
              };

              Fetch.fetchLogin(loginUser)
                .then(response => {
                  if (response.status === 204) {
                    alert("가입된 회원이 아닙니다!");
                  } else if (response.status === 409) {
                    alert("비밀번호가 일치하지 않습니다!");
                  }
                  return response.json();
                })
                .then(token => {
                  localStorage.setItem("token", token.token);
                  document.querySelector(".login").style.display = "none";
                  document.querySelector(".signup").style.display = "none";
                  document.querySelector(".logout").style.display = "block";
                  document.querySelector(".my-page-button").style.display =
                    "block";
                  history.push("/");
                })
                .catch(err => {
                  // console.log(err);
                  return err;
                });
            }
          }
          // this.props.onSubmit(e.target.id.value, e.target.pw.value);
        }
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
};

export default Login;
