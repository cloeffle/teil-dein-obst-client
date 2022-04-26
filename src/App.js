import "./App.css";

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';

import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import Support from "./Pages/Support";
import GuestPage from './Pages/GuestPage';
import Tree from './Pages/Tree';
import UserPage from './Pages/UserPage';
import TreeRegistration from './Pages/TreeRegistration';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TreeRegistration />
      <Routes>
        <Route path="ueber-teil-dein-obst" element={<About />} />
        <Route path="kontakt" element={<Support />} />
        {/* <Route path="/" element={<GuestPage />} /> */}
        <Route
          path="/loggedin"
          element={<ProtectedRoute component={UserPage} />}
        />
        <Route
          path="/loggedIn/tree"
          element={<ProtectedRoute component={Tree} />}
        />
      </Routes>
    </div>
  );
}

export default App;
