import './App.css';
import AuthenticationButton from './components/AuthenticationButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/SignUpButton';
import { Routes, Route } from 'react-router-dom';
import UserPage from './components/UserPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginButton from './components/LoginButton';
function App() {
  return (
    <div className="App">
      <SignupButton />
      <LoginButton />
      <LogoutButton />
      <Routes>
        <Route
          path="/loggedIn"
          element={<ProtectedRoute component={UserPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
