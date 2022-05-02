import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm'; 
import Logo from "../assets/logo/Logo.svg";
import Login from "../components/Login/LoginButton";
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Blaubeere from '../assets/images/icons8-blueberry-500.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Sonstiges from '../assets/images/fruit basket 500.png'
import Birne from '../assets/images/icons8-pear-500.png'
import '../assets/styles/locationDetails.css';


function LocationDetails({locationData}) {
    const params = useParams();

    console.log("param", params.id)
    console.log("locationData",locationData)

    let locationDetail = locationData.find(function(location) {
        return location._id === params.id;
    });
        

    console.log("locationDetail", locationDetail)
    
    const addComment = (text) => {
        console.log("text", text)
    }
    
  return (
    <div className='locationDetails'>
        <div className="header-login">
        <div className="logo-wrapper">
          <div className="home-logo">
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <Login />
        </div>
     <div className='locationDetails-content'>
         <>
         {locationDetail && 
         <>
         {locationDetail.type[0] === 'Apfel' && (
          <img src={Apfel} alt="Apfel-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Aprikose' && (
          <img src={Aprikose} alt="Aprikose-Icon" height={120}/>)}
          {locationDetail.type[0] === 'Birne' && (
          <img src={Birne} alt="Birne-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Blaubeere' && (
          <img src={Blaubeere} alt="Blaubeere-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Kirsche' && (
          <img src={Kirsche} alt="Kirsche-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Weintraube' && (
          <img src={Weintraube} alt="Weintraube-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Pflaume' && (
          <img src={Pflaume} alt="Pflaume-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Erdbeere' && (
          <img src={Erdbeere} alt="Erdbeere-Icon" height={120}/>)}
        {locationDetail.type[0] === 'Sonstiges' && (
          <img src={Sonstiges} alt="Obstkorb" height={120}/>)}
        <div>{locationDetail.type[0]}</div>

        <div className='locationDetails-details'>
            <p>Wo befindet sich der Baum?</p>
        {locationDetail.location.address}</div>

        <div className='locationDetails-details'>
            <p>Info des Besitzers:</p>
        {locationDetail.info}</div>

        <div className='locationDetails-details'>
            <p>Erntezeit:</p>
        {locationDetail.harvestPeriod.start} bis {locationDetail.harvestPeriod.end}</div>
        <div className='locationDetails-details' id='write-comment'>
        <p>Schreibe einen Kommentar:</p>
        <CommentForm submitLabel="Write" handleSubmit={addComment}/></div>
        <div className='locationDetails-details'>
            <p>Kommentare:</p>
       {locationDetail.comments.map(comment => {
           return <div>{comment = comment.comment}</div>


       })}
       </div>
        
        </>
         }
         </>

      </div>
    </div>
  )
}

export default LocationDetails