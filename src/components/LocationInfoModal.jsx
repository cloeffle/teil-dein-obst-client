import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import '../assets/styles/Home.css';
import '../../src/App.css';
import 'animate.css'
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Blaubeere from '../assets/images/icons8-blueberry-500.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Sonstiges from '../assets/images/fruit basket 500.png'


function LocationInfoModal({ locationInfo, setLocationInfo, locationData }) {
  console.log("locationinfo", locationInfo);

  

  return (
    <div className="location_info_modal animate__animated animate__slideInUp">
      <div className="info_wrapper">
        {locationInfo.type[0] === 'Apfel' && (
          <img src={Apfel} alt="Apfel-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Aprikose' && (
          <img src={Aprikose} alt="Aprikose-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Blaubeere' && (
          <img src={Blaubeere} alt="Blaubeere-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Kirsche' && (
          <img src={Kirsche} alt="Kirsche-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Weintraube' && (
          <img src={Weintraube} alt="Weintraube-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Pflaume' && (
          <img src={Pflaume} alt="Pflaume-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Erdbeere' && (
          <img src={Erdbeere} alt="Erdbeere-Icon" height={65}/>)}
        {locationInfo.type[0] === 'Sonstiges' && (
          <img src={Sonstiges} alt="Obstkorb" height={65}/>)}
        <p>{locationInfo.type}</p>
        <p className='addresse'>
          {locationInfo.address}
        </p>
        <p
          style={{ color: locationInfo.active === true ? 'green' : 'red' }}
        >
          
        </p>
        
        <p>{locationInfo.active ? 'active' : 'inactive'}</p>
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
