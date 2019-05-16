import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyDXQtk-kNAiN0LotPao1ZVKxg4D1--hm-8")
Geocode.enableDebug();

Geocode.fromLatLng("37", "126").then(
    response => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    error => {
      console.error(error);
    }
  );

  Geocode.fromAddress("Eiffel Tower").then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.error(error);
    }
  );

  