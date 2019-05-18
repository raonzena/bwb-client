import React, { Component } from "react";

class HomeButton extends Component {
  render() {
    return <div onClick={this.props.onClick}>home</div>;
  }
}

export default HomeButton;
