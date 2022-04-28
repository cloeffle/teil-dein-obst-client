import { useState, useRef, useCallback } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import MyLocationMarker from './MyLocationMarker'
import LocationInfoModal from './LocationInfoModal'
import LocateButton from './LocateButton'
import Filter from '../assets/images/Filter.png'



const Map = ({ locationData, lat, lng }) => {
    const [locationInfo, setLocationInfo] = useState(null)
    const [center, setCenter] = useState({lat: lat, lng: lng})
    console.log(locationData)
    
    //GET USERS CURRENT POSITOPN ON CLICK
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

    //SHOW ALL LOCATIONS ON MAP
    const locations = locationData.map(location => {
       return (
       <LocationMarker 
            key={location._id}
            lat={location.coordinates.lat.$numberDecimal} 
            lng={location.coordinates.lng.$numberDecimal} 
            onLoad={onMapLoad}

            onClick={() => setLocationInfo(
                {   
                    type: location.type,
                    strasse: location.location.strasse, 
                    plz: location.location.plz,
                    stadt: location.location.stadt,
                    status: location.status.status}
                    )}
        />
       )
    })

    //USERS COORDINATES
    console.log(center)
    

  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB1k4mwigeqizDxbO_8PkkOqjyhI1BQTxU' }}
            center = { {lat: center.lat, lng: center.lng} }
            zoom = { 20 }
            >
            <MyLocationMarker lat={lat} lng={lng} />
            {locations}
        </GoogleMapReact>
        {locationInfo && (
        <LocationInfoModal 
        locationInfo={locationInfo} 
        setLocationInfo={setLocationInfo}
        />
        )}
        <div className='btn_map_wrapper'>
        <LocateButton center={center} setCenter={setCenter} />
        <button className='btn_map'>
          <img src={Filter} alt='Filter-Icon' />
        </button>
      </div>
    </div>
  )
}

export default Map