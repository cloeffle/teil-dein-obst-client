import { useState } from 'react';
import Standort from '../assets/images/Standort2.png';

function LocateButton({ setCenter }) {
  const [counter, setCounter] = useState(0);
  return (
    <button
      className="btn_map"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude + counter,
              lng: position.coords.longitude + counter,
            });
          },
          () => null
        );
        setCounter((counter) => counter + 0.0001);
      }}
    >
      <img src={Standort} alt="Standort-Icon" />
    </button>
  );
}

export default LocateButton;
