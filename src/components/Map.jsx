import { useState, useRef, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import MyLocationMarker from './MyLocationMarker';
import LocationInfoModal from './LocationInfoModal';
import LocateButton from './LocateButton';
import FilterButton from '../assets/images/Filter.png';

const Map = ({ locationData, lat, lng, locationCoordinates, onShowFilter }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  //GET USERS CURRENT POSITION
  const [center, setCenter] = useState({
    lat: locationCoordinates.lat,
    lng: locationCoordinates.lng,
  });
  useEffect(() => {
    if (locationCoordinates) {
      setCenter({ lat: locationCoordinates.lat, lng: locationCoordinates.lng });
    }
  }, [locationCoordinates]);

  console.log('center', center);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  //SHOW ALL LOCATIONS ON MAP
  const locations = locationData.map((location) => {
    return (
      <LocationMarker
        key={location._id}
        lat={location.coordinates.lat.$numberDecimal}
        lng={location.coordinates.lng.$numberDecimal}
        onLoad={onMapLoad}
        onClick={() =>
          setLocationInfo({
            type: location.type,
            strasse: location.location.strasse,
            plz: location.location.plz,
            stadt: location.location.stadt,
            status: location.status.status,
          })
        }
      />
    );
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyB1k4mwigeqizDxbO_8PkkOqjyhI1BQTxU' }}
        center={{ lat: center.lat, lng: center.lng }}
        zoom={16}
      >
        <MyLocationMarker lat={center.lat} lng={center.lng} />
        {locations}
      </GoogleMapReact>
      {locationInfo && (
        <LocationInfoModal
          locationInfo={locationInfo}
          setLocationInfo={setLocationInfo}
        />
      )}
      <div className="btn_map_wrapper">
        <LocateButton center={center} setCenter={setCenter} />
        <button onClick={onShowFilter} className="btn_map">
          <img src={FilterButton} alt="Filter-Icon" />
        </button>
      </div>
    </div>
  );
};

export default Map;
