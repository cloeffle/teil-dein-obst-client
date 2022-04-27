import React from 'react';
import './App.css';
import Filter from './components/Filter';
import './assets/styles/styleChris.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import About from './Pages/About';
import Support from './Pages/Support';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="ueber-teil-dein-obst" element={<About />} />
        <Route path="kontakt" element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
