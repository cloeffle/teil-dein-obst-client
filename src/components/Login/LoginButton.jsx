import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Profillogo from "../../assets/logo/Profil-Logo.png";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <>
      {!isAuthenticated && (
        <button className="login-btn" onClick={() => loginWithRedirect()}>
          <img src={Profillogo} alt="Profil-Button" />
        </button>
      )}
      {isAuthenticated && (
        <Link to="/profil">
          <button className="profile-btn">
            <img src={Profillogo} alt="Profil-Button" />
          </button>
        </Link>
      )}
    </>
  );
};

export default LoginButton;
