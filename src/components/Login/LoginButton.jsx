import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <>
      {!isAuthenticated && (
        <button className="login-btn" onClick={() => loginWithRedirect()}>
          Anmelden
        </button>
      )}
      {isAuthenticated && <LogoutButton />}
    </>
  );
};

export default LoginButton;
