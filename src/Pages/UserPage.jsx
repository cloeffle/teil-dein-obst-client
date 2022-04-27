import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/Login/LogoutButton';
import '../assets/styles/userpage.css';
import LogoComponent from '../components/LogoComponent';
import Obstbaum from '../assets/images/Obstbaum.svg';

import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserPage() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`http://localhost:8000/user/${user.sub}`)
      .then((response) => setUserData(response.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .post(`http://localhost:8000/user/${user.sub}`, {
        name: user.name,
        email: user.email,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <LogoComponent />
      <div className="userpage-container">
        <h3>Hallo Username</h3>
        <div className="trees-wrapper">
          <h4>Deine Bäume</h4>
          <div className="trees-container userpage">
            <div className="my-trees">
              <a href="/loggedIn/tree">Meine Bäume</a>
              <p>Baum A</p>
              <p>Baum B</p>
              <p>Baum C</p>
            </div>
            <div className="add-trees">
              <Link to="">
                <figure>
                  <img src={Obstbaum} alt="Obstbaum" />
                  <figcaption>Baum hinzufügen</figcaption>
                </figure>
              </Link>
            </div>
          </div>
        </div>
        <div className="favorites-container">
          <h4>Deine Favoriten</h4>
          <div className="favorite-trees userpage">
            <p>Apfelbaum, Musterstr. 11</p>
            <p>Birnebaum, Musterweg. 24</p>
            <p>Erdbeere, Musterhaus 2</p>
          </div>
        </div>
        <div className="leaderboard-container">
          <h4>Rangliste</h4>
          <div className="leaderboard userpage">
            <p>1. User #12423</p>
            <p>2. User #45345</p>
            <p>3. User #23456</p>
          </div>
        </div>
        <div className="userpage-btn">
          <button className="settings-btn btn">Einstellungen</button>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
