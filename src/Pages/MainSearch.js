import React, { Component, Fragment } from "react";

const MainSearch = props => {
  return (
    <div className="Search-Div">
      <input 
        className="Input-Bar"
        type="text"
        placeholder=" 지역을 검색하시오 "
        onKeyDown={props.handleSearch}
      />
    </div>
  );
};

export default MainSearch;
