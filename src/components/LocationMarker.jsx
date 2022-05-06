import '../assets/styles/locationMarker.css';
import Marker from '../assets/images/Marker.png';
import Apfel from '../assets/images/icons8-apple-500.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';

const LocationMarker = ({ onClick, type }) => {
  // console.log('TYPE', type);
  return (
    <div className="location_marker" onClick={onClick}>
      {type === 'Apfel' && (
              <img src={Apfel} alt="Apfel-Icon" height={120} />
            )}
      {type === 'Kirsche' && (
              <img src={Kirsche} alt="Kirsche-Icon" height={120} />
            )}
    </div>
  );
};

export default LocationMarker;
