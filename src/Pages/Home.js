import React from "react";
import MainSearch from "./MainSearch";
import MapHouse from "./MapHouse";
const Home = props => {
  console.log(props, 'props')
  return (
    <div className="Bodys">
      <div className="MainSearch">
        <MainSearch handleSearch={props.handleSearch} handleClickHome={props.handleClickHome} />
      </div>
      <div className="MapHouse">
        <MapHouse searchValue={props.searchValue} />
      </div>
    </div>
  );
};

export default Home;
