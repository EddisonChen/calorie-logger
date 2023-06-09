import "./LogoutPage.css";
import LoginButton from "../LoginButton/LoginButton";
import {Routers, Routes, Route} from 'react-router-dom';

const LogoutPage = () => {

    return (
        <div>
            <p>You have logged out!</p>
            <LoginButton/>
        </div>
    )

}

export default LogoutPage;