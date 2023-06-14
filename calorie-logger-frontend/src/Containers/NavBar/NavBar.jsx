import './NavBar.css';
import UserProfile from '../../Components/UserProfile/UserProfile';
import { User } from '@auth0/auth0-react';

const NavBar = () => {


    return (
        <nav>
            {/* // profile info
            // log
            // nutrient info
            // add food */}
            <UserProfile/>
        </nav>
    )
}

export default NavBar;