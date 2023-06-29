import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';

const Home = (props) => {

    const {user} = props;

    // const {user, isLoading, isAuthenticated} = useAuth0();

    console.log(user)
    return (
        <p>Welcome, {user.name}!</p>
    )
}

export default Home;