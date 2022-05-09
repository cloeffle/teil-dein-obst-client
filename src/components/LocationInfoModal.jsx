import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "../assets/styles/Home.css";
import "../../src/App.css";
import "animate.css";


function LocationInfoModal({ locationInfo, setLocationInfo, locationData }) {
  console.log("locationinfo", locationInfo);

  return (
    <div className="location_info_modal animate__animated animate__slideInUp">
      <div className="info_wrapper">
        <div className="info-modal-type-status">
          <p className="info-modal-type">{locationInfo.type.join(", ")}</p>
          &nbsp;
          {locationInfo.active === true ? (
            <p>
              |<i style={{ color: "green" }}> aktiv</i>
            </p>
          ) : (
            <p>
              |<i style={{ color: "red" }}> inaktiv</i>
            </p>
          )}
        </div>
        <h4 className="addresse">{locationInfo.address}</h4>
        <Link to={locationInfo.id}>
          <button className="btn_info_modal">Details</button>
        </Link>
      </div>
      <AiOutlineClose
        className="close_icon"
        onClick={() => setLocationInfo(false)}
      />
    </div>
  );
}

export default LocationInfoModal;
