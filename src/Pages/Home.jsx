import { useEffect, useState } from 'react';
import Map from '../components/Map';
import '../assets/styles/Home.css';
import Filter from '../assets/images/Filter.png';
import Standort from '../assets/images/Standort.png';

import Logo from "../assets/logo/Logo.svg";
import Login from "../components/Login/LoginButton";

function Home() {
  /*GET ALL LOCATIONS FROM BACKEND*/
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/coordinates')
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(locationData);

  /*GET USERS CURRENT POSITION ON FIRST RENDER AND BY CLICKING ON BUTTON*/
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);

  useEffect(() => {
    if (currentLocation || !currentLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, [currentLocation]);

  return (
    <div className="home">
      <div className="header-login">
        <div className="logo-wrapper">
          <div className="home-logo">
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <Login />
      </div>
      {locationData && <Map locationData={locationData} lat={lat} lng={lng} />}
      <div className="btn_map_wrapper">
        <button className="btn_map" onClick={() => setCurrentLocation(true)}>
          <img src={Standort} alt="Standort-Icon" />
        </button>
        <button className="btn_map">
          <img src={Filter} alt="Filter-Icon" />
        </button>
      </div>
    </div>
  );
}

export default Home;
