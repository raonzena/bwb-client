import React from "react";

class Logout extends React.Component {
  render() {
    return <div className="logout">{this.props.onLogout()}</div>;
  }
}
export default Logout;
