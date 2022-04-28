import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import MyLocationMarker from './MyLocationMarker'
import LocationInfoModal from './LocationInfoModal'


const Map = ({ locationData, lat, lng }) => {
    const [locationInfo, setLocationInfo] = useState(null)
    
    
    const locations = locationData.map(location => {
       return (
       <LocationMarker 
            key={location._id}
            lat={location.coordinates.lat.$numberDecimal} 
            lng={location.coordinates.lng.$numberDecimal} 


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

    /*USERS COORDINATES*/
    const center = {
        lat: lat, 
        lng: lng
    }
    

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
        {locationInfo && <LocationInfoModal locationInfo={locationInfo} setLocationInfo={setLocationInfo}/>}
        
        </div>
        
   
  )     
  
}




export default Map