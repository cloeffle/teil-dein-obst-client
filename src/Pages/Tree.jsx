import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Tree() {
  const { user } = useAuth0();
  console.log(user);
  return <div>He</div>;
}

export default Tree;
