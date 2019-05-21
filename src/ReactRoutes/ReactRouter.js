import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import Signup from "../Components/Signup";
import Header from "../Headers/Header";
import MainSearch from "../Pages/MainSearch";
import Main from "../ReactRoutes/Main";
import "../App.css";
import React from "react";
import MyPage from "../Pages/MyPage";

const ReactRouter = () => {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path="/" component={Main} />
        <Route exact path="/maphouse" component={MainSearch} redn />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mypage" component={MyPage} />
      </Router>
    </div>
  );
};

export default ReactRouter;
