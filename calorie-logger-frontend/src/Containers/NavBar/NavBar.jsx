import './NavBar.css';
import UserProfile from '../../Components/UserProfile/UserProfile';
import { User } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const NavBar = () => {


    return (
        <nav>
            {/* // profile info
            // log
            // nutrient info
            // add food */}
            {/* <UserProfile/> */}
            <Link to="/userprofile">Profile</Link>
        </nav>
    )
}

export default NavBar;