import React from "react";
import MainSearch from "./MainSearch";
import MapHouse from "./MapHouse";
const Home = props => {
  return (
    <div className="Bodys">
      <div className="MainSearch">
        <MainSearch handleSearch={props.handleSearch} handleClickHome={props.handleClickHome} />
      </div>
        <MapHouse searchValue={props.searchValue} />
    </div>
  );
};

export default Home;
