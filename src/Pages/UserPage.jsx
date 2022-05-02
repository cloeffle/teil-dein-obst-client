import React, { useEffect, useState } from "react";
import LogoutButton from "../components/Login/LogoutButton";
import "../assets/styles/userpage.css";
import LogoComponent from "../components/LogoComponent";
import Obstbaum from "../assets/images/fruit-tree.png";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserPage() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(false);
  const [userTrees, setUserTrees] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  if (userFavorites) {
    console.log(userFavorites, "userFavorites");
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
        <div className="add-trees">
          <figure>
            <Link to="/baum-registrieren" className="link-add-tree">
              <img src={Obstbaum} alt="Obstbaum" />
              <figcaption>Baum hinzufügen</figcaption>
            </Link>
          </figure>
        </div>
        <div className="trees-wrapper">
          <h4>Meine Bäume</h4>
          <div className="trees-container userpage">
            <div className="my-trees">
              <table>
                <thead>
                  <tr>
                    <th>Sorte</th>
                    <th>Adresse</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userTrees &&
                    userTrees.map((myTrees) => (
                      <tr key={myTrees._id}>
                        <td className="my-tree-type">{myTrees.type}</td>
                        {
                          <td className="my-tree-address">
                            {myTrees.location.address.substring(0, 25)}...
                          </td>
                        }
                        <td className="my-tree-status">
                          {myTrees.active === true ? (
                            <p style={{ color: "green" }}>aktiv</p>
                          ) : (
                            <p style={{ color: "red" }}>inaktiv</p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="my-tree-edit">
                <Link to="/profil/baum">Bearbeiten</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="favorites-container">
          <h4>Meine Favoriten</h4>
          <div className="favorite-trees userpage">
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
                      <td>{favorite[0].location.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
          <LogoutButton />
          <button className="settings-btn btn">Einstellungen</button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
