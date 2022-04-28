import { useEffect, useState } from 'react';
import Map from '../components/Map';
import '../assets/styles/Home.css';

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
      {locationData && <Map locationData={locationData} lat={lat} lng={lng} />}
    </div>
  );
}

export default Home;