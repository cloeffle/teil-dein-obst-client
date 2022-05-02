import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Filter from '../components/Filter';
import '../assets/styles/Home.css';

import Logo from '../assets/logo/Logo.svg';
import Login from '../components/Login/LoginButton';

function Home() {
  /*GET ALL LOCATIONS FROM BACKEND*/
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);

  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/tree')
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log('Fetch Trees', locationData);

  /*GET USERS CURRENT POSITION ON FIRST RENDER*/
  //const [lat, setLat] = useState('');
  //const [lng, setLng] = useState('');
  const [locationCoordinates, setLocationCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('current position', position);
      //setLat(position.coords.latitude);
      //setLng(position.coords.longitude);
      setLocationCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
    console.log('Home handleSelectFilter', filter);
  };

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

      {showFilter ? (
        <Filter onSelectFilter={handleSelectFilter} />
      ) : (
        locationData && (
          <Map
            onShowFilter={() => setShowFilter(true)}
            locationData={locationData}
            /*lat={lat} lng={lng}*/ locationCoordinates={locationCoordinates}
          />
        )
      )}
    </div>
  );
}

export default Home;

// {
//   locationData && (
//     <Map
//       locationData={locationData}
//       /*lat={lat} lng={lng}*/ locationCoordinates={locationCoordinates}
//     />
//   );
// }
