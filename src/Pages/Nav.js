//페이지 목적
//google geocode를 통해 좌표를 받아서 maphouse에 좌표를 넘겨준다.

import React, { Component } from "react";
// import MapContainer from './MapContainer'
import Geocode from "react-geocode";
import ShowMap from "./ShowMap";
// import DetailRestaurant from './DetailRestaurant'

Geocode.setApiKey("AIzaSyDUvVw2xYB2MK4oFr8L2RLu-ukm7rbwxrM");
Geocode.enableDebug();

class Nav extends Component {
  //loadSite함수안에서 쓰일 변수들
  lat = null;
  lng = null;
  wholeSiteData = null;

  constructor(props) {
    super(props);
    this.state = {
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      siteNameForSearch: this.props.searchValue,
      lat: null,
      lng: null,
      wholeSiteData: null,
      beforeSite: null
    };
  }

  loadSite = nextProps => {
    //   //장소명을 통해 검색
    nextProps = nextProps ? nextProps : this.props;
    Geocode.fromAddress(nextProps.searchValue).then(
      response => {
        //아래 response.results[0]가 위치에 대한 모든 정보를 담고 있다.
        this.wholeSiteData = response.results[0];
        this.lat = response.results[0].geometry.location.lat;
        this.lng = response.results[0].geometry.location.lng;
        this.setState({
          siteNameForSearch: nextProps.searchValue,
          lat: this.lat,
          lng: this.lng,
          wholeSiteData: this.wholeSiteData,
          beforeSite: this.props.searchValue
        });
      },
      error => {
        console.error(error);
      }
    );
  };
  //props가 변할 때,
  componentWillMount = () => {};
  //제일 처음 한번만 렌더됨.
  componentDidMount = () => {
    this.loadSite();
  };

  //props가 변할 때,
  componentWillReceiveProps = nextProps => {
    this.loadSite(nextProps);
  };
  shouldComponentUpdate = () => {
    return true;
  };
  componentWillUpdate = () => {};
  componentDidUpdate = () => {};

  render() {
    //여기서 받는 searchValue가 직접적으로 구글Api로 들어감
    const { onKeyDown, onChange } = this.props;
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="본문 - search site2"
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </div>
        <div className="js-MapContainer MapContainer">
          {this.state.lat === this.state.beforeSite ? (
            <div>loading...</div>
          ) : (
            <ShowMap
              siteNameForSearch={this.state.siteNameForSearch}
              lat={this.state.lat}
              lng={this.state.lng}
              wholeSiteData={this.state.wholeSiteData}
            />
          )
          // < DetailRestaurant/>
          }
        </div>
      </div>
    );
  }
}
export default Nav;
