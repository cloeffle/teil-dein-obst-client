import '../assets/styles/Home.css';
import MyMarker from '../assets/images/UserLocation.png';

const myLocationMarker = () => {
  return (
    <div className="myLocation_marker">
      <img src={MyMarker} alt="myMarker" />
    </div>
  );
};

export default myLocationMarker;
