import './App.css';
import LoginButton from './Components/LoginButton/LoginButton';
import LogoutButton from './Components/LogoutButton/LogoutButton';
import AllRoutes from './Components/AllRoutes/AllRoutes';
import NavBar from './Components/NavBar/NavBar';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isLoading, isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated && <LoginButton/>}
      {isAuthenticated && <LogoutButton/>}
      {isAuthenticated && <AllRoutes
        user={user}/>}
      {isAuthenticated && <NavBar/>}
    </div>
  );
}

export default App;
