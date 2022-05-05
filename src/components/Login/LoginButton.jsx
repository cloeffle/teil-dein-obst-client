import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <>
      {!isAuthenticated && (
        <button className="login-btn" onClick={() => loginWithRedirect()}>
          <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-profile-whatsapp-flatart-icons-outline-flatarticons.png" alt="Profil-Button"/>
        </button>
      )}
      {isAuthenticated && (
        <Link to="/profil">
          <button className="profile-btn">
            <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-profile-whatsapp-flatart-icons-outline-flatarticons.png" alt="Profil-Button"/>
          </button>
        </Link>
      )}
    </>
  );
};

export default LoginButton;
