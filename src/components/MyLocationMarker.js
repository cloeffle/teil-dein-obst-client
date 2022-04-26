import '../Assets/styles/Home.css'
import MyMarker from '../Assets/images/UserLocation.png'

const myLocationMarker = () => {
    return (
      <div className='myLocation_marker'>
        <img src={MyMarker} alt="myMarker"/>
      </div>
    )
  }
  
  export default myLocationMarker