import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Fragment
} from "react-router-dom";
import Main from "./ReactRoutes/Main";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Header from "./Headers/Header";
import Logout from "./Components/Logout";
import MapHouse from "./Pages/MapHouse";
import MainSearch from "./Pages/MainSearch";
class App2 extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
        </div>

        <div>
          <Route exact path="/" component={Main} />
          {/* <Route exact path="/" component={MapHouse} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/maphouse" component={MapHouse} />
        </div>
        {/* <div>
          <MapHouse />
        </div> */}
      </Router>
    );
  }
}

export default App2;
