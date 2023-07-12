import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.css"

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-page">
            <h2 className="login-page-title">Welcome to Calorimeter!</h2>
            <h3>Please log in to get started.</h3>
            <button className="login-button button" onClick={loginWithRedirect}>Log In</button>
        </div>
    )
}

export default LoginButton;