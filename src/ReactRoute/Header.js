import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import HomeButton from ".././Pages/HomeButton";
import Fetch from "../helpers/fetch";
class Header extends Component {
  getHeader() {
    var _button;
    if (this.props.isLogin === false) {
      _button = (
        <div className="header">
          <NavLink exact to="/" className="item" activeClassName="active">
          <HomeButton/>
          </NavLink>
          <NavLink> </NavLink>
          
          <NavLink to="/login" className="item" activeClassName="active">
            로그인
          </NavLink>
          <NavLink to="/signup" className="item" activeClassName="active">
            회원가입
          </NavLink>
        </div>
      );
    } else if (this.props.isLogin === true) {
      _button = (
        <div className="header">
          <NavLink exact to="/" className="item" activeClassName="active">
          <HomeButton/>
          </NavLink>
          <NavLink
            to="/logout"
            className="item"
            activeClassName="active"
            onClick={() => {
              let token = localStorage.getItem("token");

              Fetch.fetchLogout(token)
                .then(response => {
                  if (response.status === 201) {
                    localStorage.removeItem("token");
                    this.props.changeIsLogin(false);

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
        </div>
      );
    }
    return _button;
  }
  render() {
    if (this.props.isLogin === true) {
      return <Fragment>{this.getHeader()}</Fragment>;
    } else {
      return <Fragment>{this.getHeader()}</Fragment>;
    }
  }
}

export default Header;
