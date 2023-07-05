import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Home = (props) => {

    const {user} = props;

    // const {user, isLoading, isAuthenticated} = useAuth0();

    
    useEffect(() => {
        const checkOrCreateUser = async () => {
        const response = await fetch(`http://localhost:8080/api/users/${user.sub}`, {
            method: "GET",
            contentType: "application/json",
        })
        const data = await response.json()
        console.log(data)
        if (data === null) {
            const postResponse = await fetch(`http://localhost:8080/api/users`, {
            method: "POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify({
                id: user.sub,
                name: user.name,
                email: user.email
            })
            }).then((postResponse) => {
                postResponse.json()
            }).then((json) => {
                console.log(json)
            })
        }
    }
    checkOrCreateUser()
    }, [])

    console.log(user, user.sub)
    return (
        <p>Welcome, {user.name}!</p>
    )
}

export default Home;