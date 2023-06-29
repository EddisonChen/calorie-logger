import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <h2>Welcome to Calorie Calculator!</h2>
            <h3>Please log in to get started</h3>
            <button onClick={loginWithRedirect}>Log In</button>
        </div>
    
    )
}

export default LoginButton;