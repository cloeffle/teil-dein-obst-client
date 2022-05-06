import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/Login/LogoutButton';
import '../assets/styles/userpage.css';
import LogoComponent from '../components/LogoComponent';
import Obstbaum from '../assets/images/fruit-tree.png';
import Tree from './Tree';

import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

//MODAL STYLE
const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: '4%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#C8E0C3',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px',
    fontSize: '14px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
  },
};

Modal.setAppElement('#root');

function UserPage() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(false);
  const [userTrees, setUserTrees] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  let subtitle;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // slice id to avoid special characters
    axios(
      `http://localhost:8000/user/${user.sub.slice(user.sub.length - 7)}`
    ).then((response) => setUserData(response.data));
  }, []);

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
      // .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  //MODAL FUNCTIONS
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = '#444';
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const refreshPage = () => {
    window.location.reload();
  };

  if (userFavorites) {
    console.log(userFavorites, 'userFavorites');
    userFavorites.map((favorite) =>
      console.log(favorite[0].location.adress, 'fav')
    );
  }

  if (userTrees.length > 0) {
    console.log(userTrees, 'usertrees');
    userTrees.map((myTrees) => console.log(myTrees.location.address));
  }

  return (
    <div>
      <LogoComponent />
      <div className="userpage-container">
        <div className="userpage-title">
          <h3>Hallo {user.name}</h3>
          <button>
            <img
              src="https://img.icons8.com/dusk/64/000000/gear.png"
              alt="Einstellungen"
            />
          </button>
        </div>
        <div className="add-trees">
          <figure>
            <Link to="/baum-registrieren" className="link-add-tree">
              <img src={Obstbaum} alt="Obstbaum" />
              <figcaption style={{ color: '#3d6137' }}>
                Obst hinzufügen
              </figcaption>
            </Link>
          </figure>
        </div>
        <div className="trees-wrapper">
          <div className="my-tree-edit">
            <h4>Mein Obst</h4>
            {userTrees.length > 0 && (
              <button className="tree-edit-btn" onClick={openModal}>
                <img
                  src="https://img.icons8.com/dusk/64/000000/pencil--v1.png"
                  alt="Bearbeiten"
                />
              </button>
            )}
          </div>
          <div className="trees-container userpage">
            <div className="my-trees">
              <table>
                <tbody>
                  {!userTrees.length > 0 && (
                    <tr style={{ fontSize: '14px', fontStyle: 'italic' }}>
                      <td>
                        Hier werden dir deine hochgeladenen Obstbäume/-sträucher
                        angezeigt
                      </td>
                    </tr>
                  )}
                  {userTrees.length > 0 &&
                    userTrees.map((myTrees) => (
                      <tr key={myTrees._id}>
                        <td className="my-tree-type">
                          {myTrees.type.join(', ')}
                        </td>
                        <td className="my-tree-address">
                          {myTrees.location.address.substring(0, 25)}...
                        </td>
                        <td className="my-tree-status">
                          {myTrees.active === true ? (
                            <p style={{ color: 'green' }}>aktiv</p>
                          ) : (
                            <p style={{ color: 'grey', fontWeight: 'bold' }}>
                              inaktiv
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel="Tree Modal"
              >
                <div className="modal-close">
                  <button
                    className="modal-close-btn"
                    onClick={closeModal && refreshPage}
                  >
                    &times;
                  </button>
                </div>
                <h3
                  ref={(_subtitle) => (subtitle = _subtitle)}
                  style={{ marginBottom: "1rem" }}
                >
                  Inaktivieren / Aktivieren oder Löschen
                </h3>
                <Tree />
              </Modal>
            </div>
          </div>
        </div>
        <div className="favorites-container">
          <h4>Meine Favoriten</h4>
          <div className="favorite-trees userpage">
            <table>
              {/* <thead>
                <tr>
                  <th>Status</th>
                  <th>Sorte</th>
                  <th>Adresse</th>
                </tr>
              </thead> */}
              <tbody>
                {!userFavorites.length > 0 && (
                  <tr style={{ fontSize: '14px', fontStyle: 'italic' }}>
                    <td>Hier findest du deine Favoriten</td>
                  </tr>
                )}
                {userFavorites.length > 0 &&
                  userFavorites.map((favorite) => (
                    <tr>
                      <td>{favorite[0].type[0]}</td>
                      <td>
                        {favorite[0].location.address.substring(0, 25)}...
                      </td>
                      {favorite[0].active && (
                        <p style={{ color: 'green' }}>aktiv</p>
                      )}
                      {!favorite[0].active && (
                        <p style={{ color: 'grey', fontWeight: 'bold' }}>
                          inaktiv
                        </p>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="userpage-btn">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
