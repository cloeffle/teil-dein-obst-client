import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/Login/LogoutButton';
import '../assets/styles/userpage.css';
import LogoComponent from '../components/LogoComponent';
import Obstbaum from '../assets/images/fruit-tree.png';

import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserPage() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(false);
  const [userTrees, setUserTrees] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  if (userFavorites) {
    console.log(userFavorites, 'userFavorites');
  }

  useEffect(() => {
    if (userData) {
      userData.favorites.every((favorite) =>
        axios(`http://localhost:8000/tree/${favorite}`).then((response) => {
          setUserFavorites((prev) => [...prev, response.data]);
        })
      );
    }
  }, [userData]);

  useEffect(() => {
    // slice id to avoid special characters
    axios(
      `http://localhost:8000/user/${user.sub.slice(user.sub.length - 7)}`
    ).then((response) => setUserData(response.data));
  }, []);

  useEffect(() => {
    axios(
      `http://localhost:8000/tree/collection/${user.sub.slice(
        user.sub.length - 7
      )}`
    ).then((response) => setUserTrees(response.data));
  }, [userData]);

  useEffect(() => {
    axios
      .post(
        `http://localhost:8000/user/${user.sub.slice(user.sub.length - 7)}`,
        {
          name: user.name,
          email: user.email,
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <LogoComponent />
      <div className="userpage-container">
        <h3>Hallo {user.name}</h3>
        <div className="trees-wrapper">
          <h4>Deine Bäume</h4>
          <div className="trees-container userpage">
            <div className="my-trees">
              <a href="/loggedIn/tree">Meine Bäume</a>
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Sorte</th>
                    <th>Adresse</th>
                  </tr>
                </thead>
                <tbody>
                  {userTrees &&
                    userTrees.map((favorite) => (
                      <tr>
                        {/* <td>{favorite.status.status}</td> */}
                        <td>{favorite.type}</td>
                        <td>{favorite.location.adress}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="add-trees">
              <Link to="/baum-registrieren">
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
          <div className="favorite-trees userpage"></div>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Sorte</th>
                <th>Adresse</th>
              </tr>
            </thead>
            <tbody>
              {userFavorites &&
                userFavorites.map((favorite) => (
                  <tr>
                    <td>{favorite[0].status.status}</td>
                    <td>{favorite[0].type[0]}</td>
                    <td>{favorite[0].location.adress}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <div className="leaderboard-container">
          <h4>Rangliste</h4>
          <div className="leaderboard userpage">
            <p>1. User #12423</p>
            <p>2. User #45345</p>
            <p>3. User #23456</p>
          </div>
        </div> */}
        <div className="userpage-btn">
          <button className="settings-btn btn">Einstellungen</button>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
