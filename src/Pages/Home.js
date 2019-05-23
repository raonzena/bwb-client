import React from "react";
import MainSearch from "./MainSearch";
import MapHouse from "./MapHouse";
import PracticeModal from "./PracticeModal";
const Home = props => {
  console.log(props, 'props')
  return (
    <div className="Bodys">
      <div className="MainSearch">
      <PracticeModal />
        <MainSearch handleSearch={props.handleSearch} handleClickHome={props.handleClickHome} />
      </div>
      <div className="MapHouse">
        <MapHouse searchValue={props.searchValue} />
      </div>
    </div>
  );
};

export default Home;
