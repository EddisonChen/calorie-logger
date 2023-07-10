import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.css"

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
   <div className="logout-button-container">
      <button className="logout-button button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
   </div>
    

  );
};

export default LogoutButton;