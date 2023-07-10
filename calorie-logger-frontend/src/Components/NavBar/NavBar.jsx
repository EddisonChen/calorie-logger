import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const currentDate = new Date().toLocaleDateString();

    return (
        <nav className="nav-bar">
            {/* <Link to="/">Home</Link> */}
            <Link to="/userprofile" className="nav-bar-item">PROFILE</Link>
            <Link to={`/log/${currentDate}`} className="nav-bar-item">DAILY LOG</Link>
        </nav>
    )
}

export default NavBar;