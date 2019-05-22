import React from "react";
import MainSearch from "./MainSearch";
import MapHouse from "./MapHouse";
const Home = props => {
  return (
    <div>
      <MainSearch handleSearch={props.handleSearch} />
      <MapHouse searchValue={props.searchValue} />
    </div>
  );
};

export default Home;
