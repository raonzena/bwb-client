import React from "react";

const Logout = ({ history }) => {
  return <div>{history.push("/")}</div>;
};

export default Logout;
