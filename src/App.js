import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import GuestPage from './Pages/GuestPage';
import Tree from './Pages/Tree';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestPage />} />
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
