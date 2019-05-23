import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
import MyPage from "./Pages/MyPage";
import Header from "./ReactRoute/Header";
import Home from "./Pages/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      searchValue: ""
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isLogin: true
      });
    } else {
      this.setState({
        isLogin: false
      });
    }
  };
  handleSearch = value => {
    // if (e.key === "Enter") {
    //   this.setState({
    //     searchValue: e.target.value
    //   });
    // }
    console.log(value);
    this.setState({ searchValue: value });
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   console.log(e.target.value)
  // };
  changeIsLogin = value => {
    this.setState({
      isLogin: value
    });
  };

  render() {
    console.log("app", this.state.isLogin);
    if (this.state.isLogin === null) {
      return <Loading />;
    }
    return (
      <div className="App">
        <div className="js-signApp signApp">
          <Router>
            <div>
              <Header
                isLogin={this.state.isLogin}
                changeIsLogin={this.changeIsLogin}
              />
              <div>
                {/* <Route exact path="/" render={() => <Home />} /> */}
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      handleSearch={this.handleSearch}
                      searchValue={this.state.searchValue}
                    />
                  )}
                />
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      isLogin={this.state.isLogin}
                      changeIsLogin={this.changeIsLogin}
                    />
                  )}
                />
                <Route path="/signup" render={props => <Signup />} />
                <Route path="/logout" component={Logout} />
              </div>
            </div>
          </Router>
        </div>
        <MyPage isLogin={this.state.isLogin} />
      </div>
    );
  }
}

export default App;
