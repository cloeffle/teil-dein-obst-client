import { useEffect, useState } from 'react';
import Map from '../components/Map';
import '../assets/styles/Home.css';

import Logo from "../assets/logo/Logo.svg";
import Login from "../components/Login/LoginButton";

function Home() {
  /*GET ALL LOCATIONS FROM BACKEND*/
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/tree')
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(locationData);

  /*GET USERS CURRENT POSITION ON FIRST RENDER*/
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }, []);

  

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
    </div>
  );
}

export default Home;