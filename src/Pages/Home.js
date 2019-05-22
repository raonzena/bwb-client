import React from "react";
import MainSearch from "../Pages/MainSearch";
import MapHouse from "../Pages/MapHouse";
const Home = props => {
  return (
    <div>
      <MainSearch handleSearch={props.handleSearch} />
      <MapHouse searchValue={props.searchValue} />
    </div>
  );
};

export default Home;
