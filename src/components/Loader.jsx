import React from 'react';

// import CircularProgress from '@material-ui/core/CircularProgress';

import "../App.css"

function Loader() {
  return (
    <div className="loading">
      {/* <CircularProgress color="inherit" /> */}
      <img
        src="https://img.icons8.com/bubbles/100/000000/bitten-apple.png"
        alt="Lädt..."
      />
    </div>
  );
}

export default Loader;
