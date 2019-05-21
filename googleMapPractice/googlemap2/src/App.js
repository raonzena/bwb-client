import React from 'react';
import Map from './GoogleMaps/Map';
import Home from './GoogleMaps/Home'
import './App.css';

class App extends React.Component{
  render(){
  return (
    <div className="Logo">
     <Home/>
    </div>
  );
  }
}

export default App;
