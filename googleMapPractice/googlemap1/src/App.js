// 현재위치에 따른 지도 띄우기
import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log(this.state)
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXQtk-kNAiN0LotPao1ZVKxg4D1--hm-8'
})(MapContainer);


// 검색값에 따른 경도 위도에 따른 지도 띄우기

// import React, { Component } from 'react';
// // import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

// const mapStyles = {
//   width: '50%',
//   height: '50%'
// };

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,  //Hides or the shows the infoWindow
//     selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
//     activeMarker: {},          //Shows the active marker upon click
//     siteNameForSearch: '',
//   };

//   onMarkerClick = (props, marker, e) =>
//   this.setState({
//     selectedPlace: props,
//     activeMarker: marker,
//     showingInfoWindow: true
//   });

//   onClose = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//  };

//   searchSite = (e) => {
//     if(e.key === 'Enter'){
//      this.setState({
//        siteNameForSearch: e.target.value,
//      }) 
     
//     }
//   }

//   render() {
//     console.log(this.props.google)
//     return (
//       <div>
//       <input type = "text" placeholder = "search your site" onChange={this.searchSite} onKeyDown={this.searchSite}/>
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{ lat: 37.566, lng: 126.9784 }}
//       >
//         <Marker
//           onClick={this.onMarkerClick}
//           name={'여기가 어디지???'}
//         />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>
//       </Map>
//       </div>
//      );
//     }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDXQtk-kNAiN0LotPao1ZVKxg4D1--hm-8'
// })(MapContainer);
