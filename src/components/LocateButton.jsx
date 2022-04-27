import Standort from '../assets/images/Standort.png';

function LocateButton({ panTo }) {
    console.log("Button", panTo);
  return (
      
        <>  
        {panTo&&
    
    <button className="btn_map" onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => null,
        );
    }}
        
    >
    <img src={Standort} alt="Standort-Icon" />
  </button>
}
</>
  )
}

export default LocateButton