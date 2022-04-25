import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import Support from "./Pages/Support";

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
