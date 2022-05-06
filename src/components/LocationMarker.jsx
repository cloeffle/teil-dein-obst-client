import '../assets/styles/locationMarker.css';
import Marker from '../assets/images/Marker.png';
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Birne from '../assets/images/icons8-pear-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Heidelbeere from '../assets/images/icons8-blueberry-500.png';
import Himbeere from '../assets/images/icons8-raspberry-500.png';
import Johannisbeere from '../assets/images/icons8-redcurrant-512.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Stachelbeere from '../assets/images/icons8-gooseberry-500-2.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';
import Korb from '../assets/images/fruit basket 500.png';

const LocationMarker = ({ onClick, type }) => {
  // console.log('TYPE', type);
  return (
    <div className="location_marker" onClick={onClick}>
      {type === 'Apfel' && <img src={Apfel} alt="Apfel-Icon" height={120} />}
      {type === 'Kirsche' && (
        <img src={Kirsche} alt="Kirsche-Icon" height={120} />
      )}
      {type === 'Aprikose' && (
        <img src={Aprikose} alt="Aprikose-Icon" height={120} />
      )}
      {type === 'Birne' && <img src={Birne} alt="Birne-Icon" height={120} />}
      {type === 'Erdbeere' && (
        <img src={Erdbeere} alt="Erdbeere-Icon" height={120} />
      )}
      {type === 'Heidelbeere' && (
        <img src={Heidelbeere} alt="Heidelbeere-Icon" height={120} />
      )}
      {type === 'Himbeere' && (
        <img src={Himbeere} alt="Himbeere-Icon" height={120} />
      )}
      {type === 'Johannisbeere' && (
        <img src={Johannisbeere} alt="Johannisbeere-Icon" height={120} />
      )}
      {type === 'Kirsche' && (
        <img src={Kirsche} alt="Kirsche-Icon" height={120} />
      )}
      {type === 'Stachelbeere' && (
        <img src={Stachelbeere} alt="Stachelbeere-Icon" height={120} />
      )}
      {type === 'Weintraube' && (
        <img src={Weintraube} alt="Weintraube-Icon" height={120} />
      )}
      {type === 'Pflaume' && (
        <img src={Pflaume} alt="Pflaume-Icon" height={120} />
      )}
      {type === 'Korb' && <img src={Korb} alt="Sonstiges-Icon" height={120} />}
    </div>
  );
};

export default LocationMarker;
