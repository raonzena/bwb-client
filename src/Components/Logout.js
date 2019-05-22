import React from "react";

const Logout = ({ history }) => {
  return <div>{history.push("/login")}</div>;
};
export default Logout;
