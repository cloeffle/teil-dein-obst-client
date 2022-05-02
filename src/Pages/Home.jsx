import { useEffect, useState } from 'react';
import Map from '../components/Map';
import '../assets/styles/Home.css';
import Logo from "../assets/logo/Logo.svg";
import Login from "../components/Login/LoginButton";

function Home( {locationData} ) {
  
  //GET CURRENT POSITION
  const [locationCoordinates, setLocationCoordinates] = useState({});

  useEffect(() => {
      
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("current position",position)
        setLocationCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
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
      {locationData && <Map locationData={locationData} /*lat={lat} lng={lng}*/ locationCoordinates={locationCoordinates}/>}
    </div>
  );
}

export default Home;