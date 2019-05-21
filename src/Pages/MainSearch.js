import React, { Component, Fragment } from "react";

const MainSearch = props => {
  return (
    <div>
      <input
        type="text"
        placeholder="검색하시오"
        onKeyDown={props.handleSearch}
      />
    </div>
  );
};

export default MainSearch;
