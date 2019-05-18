//페이지 목적
//좌표를 받아서 그 좌표를 기준으로 주변의 맛집을 찾는다.

import React, { Component, Fragment } from "react";
import MeetingLists from "../Components/MeetingLists";
import "./MapSearchPlace.css";
// import DetailRestaurant from "./DetailRestaurant";
/* global google */

var map;
// var infowindow;
// var service;

class ShowMap extends Component {
  state = {
    datas: this.props,
    service: null,
    places: null,
    restaurantInfos: [],
    meetingsInfos: null
  };
  clickMarker = e => {
    console.log(e.target, "fuck");
  };

  createMarkers = places => {
    this.clickMarker(places);
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.querySelector(".places");

    if (placesList.firstChild) {
      while (placesList.firstChild) {
        placesList.removeChild(placesList.firstChild);
      }
    }

    for (var i = 0, place; (place = places[i]); i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      var li = document.createElement("li");
      li.textContent = place.name;

      placesList.appendChild(li);
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  };

  initMap = nextProps => {
    nextProps = nextProps ? nextProps : this.props;

    const lat = nextProps.lat;
    const lng = nextProps.lng;
    var site = new google.maps.LatLng(lat, lng);

    let infowindow = new google.maps.InfoWindow();

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

    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (
          JSON.stringify(this.state.restaurantInfos) !== JSON.stringify(results)
        ) {
          console.log(results, "results");
          this.createMarkers(results);
          map.setCenter(results[0].geometry.location);
          let meetingsInfos = await this.bringMeetingData(results);

          this.setState({
            datas: nextProps,
            service: service,
            restaurantInfos: results,
            meetingsInfos: meetingsInfos
          });
        }
      }
    });
  };

  bringMeetingData = async restaurantInfos => {
    var restaurantMeetingInfos = await restaurantInfos.map(async (ele, idx) => {
      return await fetch(
        "http://localhost:3000/meetings/list/region?q=" + ele.place_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => {
          if (response.status === 200) {
            console.log(response.status);
          }
          return response.json();
        })
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    });
    return restaurantMeetingInfos;
  };

  componentWillReceiveProps = nextProps => {
    this.initMap(nextProps);
  };
  componentDidMount = () => {
    this.initMap();
  };

  shouldComponentUpdate = () => {
    return true;
  };

  componentWillUpdate = () => {};

  componentDidUpdate = () => {};

  render() {
    const { datas, restaurantInfos, service, meetingsInfos } = this.state;
    console.log(meetingsInfos, "hi");
    return (
      <Fragment>
        <div className="mapHead">
          <div className="mapBody">
            <div className="map" />
            <div className="right-panel">
              <h2>Results</h2>
              <ul className="places" />
              <button className="more">More results</button>
            </div>
          </div>
        </div>

        <div>
          {meetingsInfos ? (
            meetingsInfos.map((ele, idx) => (
              <MeetingLists
                meetingsInfos={ele}
                key={idx}
                // restaurantInfos={restaurantInfos}
              />
            ))
          ) : (
            <div>LOADING</div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default ShowMap;
