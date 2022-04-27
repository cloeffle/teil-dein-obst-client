import { useState, useRef, useCallback } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import MyLocationMarker from './MyLocationMarker'
import LocationInfoModal from './LocationInfoModal'
import LocateButton from './LocateButton'
import Filter from '../assets/images/Filter.png';



const Map = ({ locationData, lat, lng }) => {
    const [locationInfo, setLocationInfo] = useState(null) //locationInfo IS THE OBJECT WITH ALL INFO ABOUT THE LOCATION
   
    //GET USERS CURRENT POSITOPN ON CLICK
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        }, []);

    const panTo = useCallback(( {lat, lng} ) => {
        console.log(lat, lng);
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
      }, []);

    console.log(panTo);

    //SHOW ALL LOCATIONS ON MAP
    const locations = locationData.map(location => {
       return (
       <LocationMarker 
            key={location.id} 
            lat={location.coordinates.lat} 
            lng={location.coordinates.lng} 

            onClick={() => setLocationInfo(
                {   
                    type: location.type.type,
                    strasse: location.location.strasse, 
                    plz: location.location.plz,
                    stadt: location.location.stadt,
                    status: location.status.status}
                    )}
        />
       )
    })


    //USERS COORDINATES
    const center = {
        lat: lat, 
        lng: lng
    }
    

  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB1k4mwigeqizDxbO_8PkkOqjyhI1BQTxU' }}
            center = { {lat: center.lat, lng: center.lng} }
            zoom = { 16 }
            onLoad = { onMapLoad }

            >
            <MyLocationMarker 
            lat={lat} 
            lng={lng} 
            
            />
            {locations}
        </GoogleMapReact>
        {locationInfo && <LocationInfoModal locationInfo={locationInfo} setLocationInfo={setLocationInfo} />}
        <div className="btn_map_wrapper">
        <LocateButton panTo={panTo} />
        <button className="btn_map">
          <img src={Filter} alt="Filter-Icon" />
        </button>
      </div>
        </div>
        
   
  )    
} 
  
export default Map;