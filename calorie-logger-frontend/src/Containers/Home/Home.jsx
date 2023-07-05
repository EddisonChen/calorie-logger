import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Home = (props) => {

    const {user} = props;

    // const {user, isLoading, isAuthenticated} = useAuth0();

    useEffect(() => {
        const checkOrCreateUser = async () => {
        const cleanUrl = (user.sub).replace(/\|/g, "%7C")
        const response = await fetch(`http://localhost:8080/api/users/${cleanUrl}`, {
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
                email: user.email,
                sex: "male",
                unit_type: "imperial",
                height: 69,
                weight: 150,
                age: 25,
                activity_level: 1.2,
                goal: 0,
                goal_calories: 1988,
                goal_protein: 149,
                goal_carbohydrate: 199,
                goal_fat: 66 
            })
            })
        }
    }
    checkOrCreateUser()
    }, [])

    // console.log(user, user.sub)
    return (
        <p>Welcome, {user.name}!</p>
    )
}

export default Home;