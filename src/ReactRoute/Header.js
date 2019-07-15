import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Fetch from "../helpers/fetch";
import logo from "../img/logo.png";

class Header extends Component {
  getHeader() {
    var _button;
    if (this.props.isLogin === false) {
      _button = (
        <Fragment>
          <div className="header">
            <NavLink
              exact
              to="/"
              className="item"
              activeClassName="sign-active"
            >
              <img src={logo} style={{ height: "70%" }} alt="" />
            </NavLink>
          </div>
          <div className="signup-button">
            <NavLink
              to="/signup"
              className="sign-link signup"
              activeClassName="sign-active"
            >
              SIGN UP
            </NavLink>
          </div>
          <div className="login-button">
            <NavLink
              to="/login"
              className="sign-link loginin"
              activeClassName="sign-active"
            >
              LOG IN
            </NavLink>
          </div>
        </Fragment>
      );
    } else if (this.props.isLogin === true) {
      _button = (
        <Fragment>
          <div className="header">
            <NavLink exact to="/" className="item" activeClassName="active">
              <img src={logo} style={{ height: "70%" }} alt="" />
            </NavLink>
          </div>

          <div className="logout-button">
            <NavLink
              to="/logout"
              className="sign-link logout"
              activeClassName="sign-active"
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
                    return err;
                  });
              }}
            >
              LOG OUT
            </NavLink>
          </div>
        </Fragment>
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
