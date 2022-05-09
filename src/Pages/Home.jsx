import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Filter from '../components/Filter';
import '../assets/styles/Home.css';
import Logo from '../assets/logo/Logo.svg';
import AuthenticationButton from '../components/Login/AuthenticationButton';

function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /*GET ALL LOCATIONS FROM BACKEND*/

  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/tree')
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.log(error));
  }, []);

  /*GET USERS CURRENT POSITION ON FIRST RENDER*/
  //const [lat, setLat] = useState('');
  //const [lng, setLng] = useState('');
  const [locationCoordinates, setLocationCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //setLat(position.coords.latitude);
      //setLng(position.coords.longitude);
      setLocationCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsLoading(false);
    });
    setIsLoading(true);
  }, []);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
  };

  //! Filtering Data for Map-Markers, filterLocations to connect with Markers
  const locations = locationData;
  const filter = selectedFilter;

  //! New Filter
  const filteredLocations = locations.filter((location) => {
    for (let i = 0; i < filter.length; i++) {
      if (location.type.includes(filter[i].name)) {
        return location;
      }
    }
    return null;
  });

  // Vorheriger Filter
  // const filteredLocations = locations.filter((location) => {
  //   for (let i = 0; i < filter.length; i++) {
  //     if (location.type[0] === filter[i].name) {
  //       return location;
  //     }
  //   }
  //   return null;
  // });

  return (
    <div className="home">
      <div className="header-login">
        <div className="logo-wrapper">
          <div className="home-logo">
            <a href="/">
              <img src={Logo} alt="logo" />
            </a>
          </div>
        </div>
        <AuthenticationButton />
      </div>

      {showFilter ? (
        <Filter
          selectedFilter={selectedFilter}
          onSelectFilter={handleSelectFilter}
        />
      ) : (
        locationData && (
          <Map
            onShowFilter={() => setShowFilter(true)}
            locationData={locationData}
            filteredLocations={filteredLocations}
            /*lat={lat} lng={lng}*/ locationCoordinates={locationCoordinates}
            isLoading={isLoading}
          />
        )
      )}
    </div>
  );
}

export default Home;
