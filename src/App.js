import './App.css';
import AuthenticationButton from './components/AuthenticationButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/SignUpButton';

function App() {
  return (
    <div className="App">
      <SignupButton />
      <AuthenticationButton />
      <LogoutButton />
    </div>
  );
}

export default App;
