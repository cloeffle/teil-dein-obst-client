import React from 'react';

import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';
import Profillogo from '../../assets/logo/Profil-Logo.png';

import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Link to="/profil">
      <button className="profile-btn">
        <img src={Profillogo} alt="Profil-Button" />
      </button>
    </Link>
  ) : (
    <LoginButton />
  );
};

export default AuthenticationButton;
