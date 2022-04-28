import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="login-btn" onClick={() => loginWithRedirect()}>
      Anmelden
    </button>
  );
};

export default LoginButton;
