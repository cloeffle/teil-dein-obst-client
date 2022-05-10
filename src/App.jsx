import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import About from './pages/About';
import Support from './pages/Support';
import Home from './pages/Home';
import Tree from './pages/Tree';
import UserPage from './pages/UserPage';
import TreeRegistration from './pages/TreeRegistration';
import LocationDetails from './pages/LocationDetails';

function App() {
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    fetch('https://teile-deine-obst.herokuapp.com/tree')
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:id"
          element={<LocationDetails locationData={locationData} />}
        />
        <Route path="ueber-teil-dein-obst" element={<About />} />
        <Route path="kontakt" element={<Support />} />
        <Route
          path="/profil"
          element={<ProtectedRoute component={UserPage} />}
        />
        <Route
          path="baum-registrieren"
          element={<ProtectedRoute component={TreeRegistration} />}
        />
        <Route
          path="/profil/baum"
          element={<ProtectedRoute component={Tree} />}
        />
      </Routes>
    </div>
  );
}

export default App;
