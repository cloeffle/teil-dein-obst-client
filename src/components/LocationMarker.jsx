import Marker from '../assets/images/Marker.png';

const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <div className="location_marker" onClick={onClick}>
      <img 
      src={Marker} 
      scaledSize={new window.google.maps.Size(30, 30)} 
      origin = {new window.google.maps.Point(0,0)}
      anchor = {new window.google.maps.Point(15, 15)}
      className="location_icon" alt="marker" />
    </div>
  );
};

export default LocationMarker;
