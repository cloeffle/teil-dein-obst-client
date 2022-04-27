import Marker from '../Assets/images/Marker.png'

const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <div className='location_marker' onClick={onClick}>
        <img src={Marker} className="location_icon" alt="marker"/>
    
    </div>

  )
}

export default LocationMarker;

