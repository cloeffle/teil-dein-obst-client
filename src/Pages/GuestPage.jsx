import React from 'react';
import SignupButton from '../components/Login/SignUpButton';
import AuthenticationButton from '../components/Login/AuthenticationButton';

function GuestPage() {
  return (
    <div>
      <h1>You are a Guest</h1>
      <SignupButton />
      <AuthenticationButton />
      <a href="/loggedIn">Profil</a>
    </div>
  );
}

export default GuestPage;
