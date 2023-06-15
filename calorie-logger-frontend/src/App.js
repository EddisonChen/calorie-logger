import './App.css';
import LoginButton from './Components/LoginButton/LoginButton';
import LogoutButton from './Components/LogoutButton/LogoutButton';
import UserProfile from './Containers/UserProfile/UserProfile';
import AllRoutes from './Components/AllRoutes/AllRoutes';
import NavBar from './Components/NavBar/NavBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect} from 'react';

function App() {

  const { user, isLoading, isAuthenticated } = useAuth0()

  

  // const showUser = () => {
  //   if (isAuthenticated) {
  //     console.log(user.name)
  //   } else {
  //     console.log("no")
  //   }
  // }

  // useEffect(showUser, [])

  return (
    <div>
      {/* <LoginButton/>
      <LogoutButton/>
      {isAuthenticated && <UserProfile/>} */}
      <AllRoutes/>
      <NavBar/>
    </div>
  );
}

export default App;
