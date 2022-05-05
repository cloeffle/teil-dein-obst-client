import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Filter from '../components/Filter';
import '../assets/styles/Home.css';
import Logo from '../assets/logo/Logo.svg';
import AuthenticationButton from '../components/Login/AuthenticationButton';
import { LocationSearching } from '@mui/icons-material';

function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);

  /*GET ALL LOCATIONS FROM BACKEND*/

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

  console.log('selectedFilter', selectedFilter);

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

  console.log('filteredLocations', filteredLocations);

  return (
    <div className="home">
      <div className="header-login">
        <div className="logo-wrapper">
          <div className="home-logo">
            <img src={Logo} alt="logo" />
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
          />
        )
      )}
    </div>
  );
}

export default Home;
