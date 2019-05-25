import React from "react";
import MainSearch from "./MainSearch";
import MapHouse from "./MapHouse";
import logo from "../img/logo.png";
const Home = props => {
  return (
    <div className="Bodys">
      <div className="MainSearch">
        <MainSearch
          handleSearch={props.handleSearch}
          handleClickSearch={props.handleClickSearch}
          handleClickHome={props.handleClickHome}
          style={{ margin: 0, padding: 0 }}
        />
      </div>

      <div className="MapHouse">
        <MapHouse searchValue={props.searchValue} />
      </div>
    </div>
  );
};

export default Home;
