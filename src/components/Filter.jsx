import React from 'react';
import '../assets/styles/styleChris.css';
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Birne from '../assets/images/icons8-pear-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Heidelbeere from '../assets/images/icons8-blueberry-500.png';
import Himbeere from '../assets/images/icons8-raspberry-500.png';
import Johannisbeere from '../assets/images/icons8-redcurrant-512.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Stachelbeere from '../assets/images/icons8-gooseberry-500.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';

function Filter() {
  return (
    <div>
      <div className="chooseBtnCont">
        <button className="chooseBtn">
          <p>ALLE:</p>
        </button>
        <button className="chooseBtn">
          <p>Steinobst:</p>
        </button>
        <button className="chooseBtn">
          <p>Kernobst:</p>
        </button>
        <button className="chooseBtn">
          <p>Schalenobst:</p>
        </button>
        <button className="chooseBtn">
          <p>Beerenobst:</p>
        </button>
      </div>

      <div className="container">
        <div>
          <button className="card-2">
            <img src={Apfel} alt="Apfel" />
            <p>Äpfel</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Aprikose} alt="Aprikose" />
            <p>Aprikosen</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Birne} alt="Birne" />
            <p>Birnen</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Erdbeere} alt="Erdbeeren" />
            <p>Erdbeeren</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Heidelbeere} alt="Heidelbeere" />
            <p>Heidelbeeren</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Himbeere} alt="Himbeere" />
            <p>Himbeere</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Johannisbeere} alt="Johannisbeere" />
            <p>Johannisbeeren</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Kirsche} alt="Kirschen" />
            <p>Kirschen</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Stachelbeere} alt="Stachelbeeren" />
            <p>Stachelbeeren</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Pflaume} alt="Pflaumen" />
            <p>Pflaumen</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src={Weintraube} alt="Weintrauben" />
            <p>Weintrauben</p>
          </button>
        </div>
        <div>
          <button className="card-2">
            <img src="#" alt="Sonstiges" />
            <p>Sonstiges</p>
          </button>
        </div>
        <div>
          <button className="select">Filter anwenden</button>
        </div>
        <div>
          <button className="delete">Filter löschen</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
