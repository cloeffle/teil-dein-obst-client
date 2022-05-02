import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import MyLocationMarker from './MyLocationMarker'
import LocationInfoModal from './LocationInfoModal'
import LocateButton from './LocateButton'
import Filter from '../assets/images/Filter.png'



const Map = ({ locationData, locationCoordinates}) => {
    const [locationInfo, setLocationInfo] = useState(null)
    
    //GET USERS CURRENT POSITION
    const [center, setCenter] = useState({lat: locationCoordinates.lat, lng: locationCoordinates.lng})
    useEffect(() => {
      if (locationCoordinates) {
        setCenter({lat: locationCoordinates.lat, lng: locationCoordinates.lng})
      }
    }, [locationCoordinates])

    console.log("center", center)
    
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  console.log("locationData", locationData)
  //filterArray = ["Kirsch", "Apfel"] //dein filter state

    //SHOW ALL LOCATIONS ON MAP
    const locations = locationData.map(location => {
       return (
       <LocationMarker 
            key={location._id}
            lat={location.coordinates.lat.$numberDecimal} 
            lng={location.coordinates.lng.$numberDecimal} 
            type={location.type[0]}
            onLoad={onMapLoad}

            onClick={() => setLocationInfo(
                {   
                    type: location.type,
                    address: location.location.address, 
                    
                    id: location._id}
                    )}
        />
       )
    })


  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB1k4mwigeqizDxbO_8PkkOqjyhI1BQTxU' }}
            center = { {lat: center.lat, lng: center.lng} }
            zoom = { 16 }
            >
            <MyLocationMarker lat={center.lat} lng={center.lng} />
            {locations}
        </GoogleMapReact>
        {locationInfo && (
        <LocationInfoModal 
        locationInfo={locationInfo} 
        setLocationInfo={setLocationInfo}
        locationData={locationData}
        />
        )}
        <div className='btn_map_wrapper'>
        <LocateButton center={center} setCenter={setCenter} />
        <Link to="/filter"><button className='btn_map'>
          <img src={Filter} alt='Filter-Icon' />
        </button></Link>
      </div>
    </div>
  )
}

export default Map