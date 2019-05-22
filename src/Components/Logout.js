import React from "react";

class Logout extends React.Component {
  onLogout = () => {
    var token = localStorage.getItem("token");
    fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
        authorization: token
      }
    })
      .then(response => {
        if (response.status === 201) {
          localStorage.removeItem("token");
          this.props.changeIsLogin(null, false);
          // document.querySelector(".my-page-button").style.display = "none";
          // document.querySelector(".my-page").style.display = "none";
          // alert("로그아웃 되었습니다");
          return response;
        }
        return response;
      })
      .catch(err => {
        alert("로그아웃에 실패했습니다");
        console.log(err);
        return err;
      });
  };
  render() {
    return <div className="logout">{this.onLogout()}</div>;
  }
}
export default Logout;
