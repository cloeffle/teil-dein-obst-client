import { AiOutlineClose } from 'react-icons/ai';
import '../assets/styles/Home.css';

function LocationInfoModal({ locationInfo, setLocationInfo }) {
  console.log(locationInfo);

  return (
    <div className="location_info_modal">
      <div className="info_wrapper">
        <h2>Info</h2>
        <p>{locationInfo.type}</p>
        <p>
          {locationInfo.strasse}, {locationInfo.plz} {locationInfo.stadt}
        </p>
        <p
          style={{ color: locationInfo.status === 'active' ? 'green' : 'red' }}
        >
          {locationInfo.status}{' '}
        </p>
        <button className="btn_info_modal">Details</button>
      </div>
      <AiOutlineClose
        className="close_icon"
        onClick={() => setLocationInfo(false)}
      />
    </div>
  );
}

export default LocationInfoModal;
