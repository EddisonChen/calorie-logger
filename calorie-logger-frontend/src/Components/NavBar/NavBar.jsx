import './NavBar.css';
import { User } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

    const currentDate = new Date().toLocaleDateString();

    return (
        <nav>
            {/* // profile info
            // log
            // nutrient info
            // add food */}
            <Link to="/">Home</Link>
            <Link to="/userprofile">Profile</Link>
            <Link to={`/log/${currentDate}`}>Daily Log</Link>
            {/* {renderDailyLog} */}
        </nav>
    )
}

export default NavBar;