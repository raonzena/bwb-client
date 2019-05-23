import React, { Component, Fragment } from "react";
import Geocode from "react-geocode";
import "./MapSearchPlace.css";
import LeftContainer from "../Components/LeftContainer";

Geocode.setApiKey("AIzaSyDUvVw2xYB2MK4oFr8L2RLu-ukm7rbwxrM");
Geocode.enableDebug();

/* global google */

var map;

class MapHouse extends Component {
  //레스토랑인포담기

  //마커 클릭시 정보 담기
  // clickMarkerRestaurantInfo = null;

  //검색한 장소에 대한 경도, 위도 좌표
  lat = null;
  lng = null;

  state = {
    //실제 지도 검색 키워드//
    restaurantInfos: [],
    clickMarkerRestaurantInfo: null
  };

  //searchValue를 구글맵에 전달하여 위치 좌표를 받는 함수

  loadSite = data => {
    if (data) {
      Geocode.fromAddress(data)
        .then(response => {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
          this.createMap(this.lat, this.lng);
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    }
  };

  createMap = (lat, lng) => {
    var site = new google.maps.LatLng(lat, lng);

    map = new google.maps.Map(document.querySelector(".map"), {
      center: site,
      zoom: 15
    });

    var request = {
      location: site,
      radius: "75",
      type: ["restaurant"]
    };

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (JSON.stringify(results)) {
          // console.log(results, "음식점 정보");
          this.setState({
            restaurantInfos: results
          });
          this.createMarkers(lat, lng, results, map);
          map.setCenter(results[0].geometry.location);
          // this.meetingsInfos = this.bringMeetingData(results);
        }
      }
    });
  };

  createMarkers = (lat, lng, places, map) => {
    var bounds = new google.maps.LatLngBounds();

    for (let i = 0, place; (place = places[i]); i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      let marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      var site = new google.maps.LatLng(lat, lng);

      let infowindow = new google.maps.InfoWindow();
      let infowindowContent = document.createElement("span");

      infowindow.setContent(infowindowContent);
      infowindow.content.innerText = place.rating
        ? place.name + " / 평점 : ⭐️x" + place.rating + "\n"
        : place.name + "평점 : ⭐x0" + "\n";

      infowindow.setPosition();

      marker.addListener(
        "click",
        (
          locationMarker = place.geometry.location,
          thisMarker = marker,
          placeId = place.place_id
        ) => {
          return (() => {
            infowindow.open(locationMarker.latLng, thisMarker);
            var service = new google.maps.places.PlacesService(map);
            service.getDetails({ placeId: placeId }, (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('!!!!!!!', place)
                this.setState({
                  clickMarkerRestaurantInfo: place
                });
              }
            });
          })(locationMarker, thisMarker, placeId);
        }
      );

      var li = document.createElement("li");
      li.textContent = place.name;

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  };

  backToMeetingList = () => {
    this.setState({
      clickMarkerRestaurantInfo: null
    });
  }

  componentDidMount = () => {
    this.loadSite(this.props.searchValue);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSite(nextProps.searchValue);
  }
  render() {
    return (
      <Fragment>
        <div className="Middle">
          <div className="leftContainer">
            <LeftContainer
              restaurantInfos={this.state.restaurantInfos}
              clickMarkerRestaurantInfo={this.state.clickMarkerRestaurantInfo}
              backToMeetingList={this.backToMeetingList}
            />
          </div>

          <div className="rightContainer">
            <div className="mapHead">
              <div className="mapBody">
                <div className="map" />
                <div className="infowindow-content" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="leftContainer">
          {this.state.clickMarkerRestaurantInfo ?
            <LeftContainer
              restaurantInfos={this.state.restaurantInfos}
              clickMarkerRestaurantInfo={this.state.clickMarkerRestaurantInfo}
            />
            :
            false
          }
        </div> */}
      </Fragment>
    );
  }
}
export default MapHouse;

