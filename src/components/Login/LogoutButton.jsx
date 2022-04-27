import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="logout-btn btn"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Abmelden
    </button>
  );
};

export default LogoutButton;
