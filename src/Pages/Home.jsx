import { useEffect, useState } from 'react';
import Map from '../components/Map';
import '../Assets/styles/Home.css'
import Filter from '../Assets/images/Filter.png'
import Standort from '../Assets/images/Standort.png'



    function Home() {

        /*GET ALL LOCATIONS FROM BACKEND*/
        const [locationData, setLocationData] = useState([]);

        useEffect(() => {
            fetch('http://localhost:8000/coordinates')
            .then(response => response.json())
            .then(data => setLocationData(data))
            .catch(error => console.log(error))
    }, [])

    console.log(locationData)

         /*GET USERS CURRENT POSITION ON FIRST RENDER AND BY CLICKING ON BUTTON*/    
        const [lat, setLat] = useState('');
        const [lng, setLng] = useState('');
        const [currentLocation, setCurrentLocation] = useState (false);

        
        useEffect(() => {
            if (currentLocation || !currentLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            })
            }
        }, [currentLocation])



      return (
          <div className='home'>
        {locationData && 
            <Map locationData={locationData} lat={lat} lng={lng} />}
            <div className='btn_map_wrapper'>
                <button className='btn_map' onClick={() => setCurrentLocation(true)}><img src={Standort} alt="Standort-Icon"/></button>
                <button className='btn_map'><img src={Filter} alt="Filter-Icon"/></button>
            </div>
        </div>
      )
    }
    
    export default Home