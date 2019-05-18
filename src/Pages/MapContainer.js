// 적혀져 있는 위치에 따른 지도 활성화
import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

//직접 문자로 위치를 검색하기 위해  Geocode라이브러리를 사용
const mapStyles = {
  width: "100%",
  height: "50%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      activeMarker: {}, //Shows the active marker upon click
      wholeSiteData: "",
      checkSite: "",
      searchValue: "",
      lat: "",
      lng: ""
    };
  }

  // addMarker = (mapProps, map) => {
  //   // var marker = new google.maps.Marker({
  //   //   position: {},
  //   //   map: map
  //   // });
  // };

  // onMapClicked = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  init = () => {
    this.setState({
      wholeSiteData: this.props.wholeSiteData,
      activeMarker: { lat: this.props.lat, lng: this.props.lng },
      lat: this.props.lat,
      lng: this.props.lng
    });
  };

  componentWillReceiveProps = () => {
    this.init();
  };
  componentDidMount = () => {
    this.init();
  };

  shouldComponentUpdate = () => {
    return true;
  };
  componentWillUpdate = () => {};
  componentDidUpdate = () => {};

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          onClick={this.onMapClicked}
          onReady={this.addMarker}
          center={{ lat: this.state.lat, lng: this.state.lng }}
        >
          <Marker
            position={{ lat: this.props.lat, lng: this.props.lng }}
            onClick={this.onMarkerClick}
            name={this.state.wholeSiteData.formatted_address}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDUvVw2xYB2MK4oFr8L2RLu-ukm7rbwxrM"
})(MapContainer);
