import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Fetch from "../helpers/fetch";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <Fragment>
        <NavLink exact to="/" className="item" activeClassName="active">
          홈
        </NavLink>
        <NavLink
          to="/logout"
          className="item logout"
          activeClassName="active"
          onClick={() => {
            let token = localStorage.getItem("token");
            Fetch.fetchLogout(token)
              .then(response => {
                if (response.status === 201) {
                  localStorage.removeItem("token");
                  document.querySelector(".logout").style.display = "none";
                  document.querySelector(".login").style.display = "block";
                  document.querySelector(".signup").style.display = "block";
                  document.querySelector(".my-page-button").style.display =
                    "none";
                  return response;
                }
                return response;
              })
              .catch(err => {
                console.log(err);
                return err;
              });
          }}
        >
          로그아웃
        </NavLink>
      </Fragment>

      <Fragment>
        {/* <NavLink exact to="/" className="item" activeClassName="active">
          홈
        </NavLink> */}
        <NavLink to="/login" className="item login" activeClassName="active">
          로그인
        </NavLink>
        <NavLink to="/signup" className="item signup" activeClassName="active">
          회원가입
        </NavLink>
      </Fragment>
    </div>
  );
};

export default Header;
