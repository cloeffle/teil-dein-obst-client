import React from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Link } from "react-router-dom";


import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated)

  return isAuthenticated ? (
    <Link to="/profil">
      <button className="profile-btn">
        <img
          src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-profile-whatsapp-flatart-icons-outline-flatarticons.png"
          alt="Profil-Button"
        />
      </button>
    </Link>
  ) : (
    <LoginButton />
  );
};

export default AuthenticationButton;
