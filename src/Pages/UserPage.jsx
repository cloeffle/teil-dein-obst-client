import React from 'react';
import LogoutButton from '../components/Login/LogoutButton';

function UserPage() {
  return (
    <div>
      <h1>You are an user!</h1>
      <LogoutButton />
      <a href="/loggedIn/tree">Tree</a>
    </div>
  );
}

export default UserPage;
