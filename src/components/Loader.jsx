import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import "../App.css"

function Loader() {
  return (
    <div className="loading">
      <CircularProgress color="success" />
    </div>
  );
}

export default Loader;
