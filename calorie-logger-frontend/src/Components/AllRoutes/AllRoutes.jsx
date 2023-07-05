import {useLocation, Routes, Route} from 'react-router-dom';
import LogoutPage from '../LogoutPage/LogoutPage';
import UserProfile from '../../Containers/UserProfile/UserProfile';
import DailyLog from '../../Containers/DailyLog/DailyLog';
import Home from '../../Containers/Home/Home';
import { useState, useEffect } from 'react';

const AllRoutes = (props) => {

    const {user} = props;

    const location = useLocation();

    const [goalCalories, setGoalCalories] = useState(null);
    const [macronutrients, setMacronutrients] = useState({
        protein: ".3",
        fat: ".3",
        carbohydrate: ".4"
    });

    const generateDates = () => {
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())
        const oneYearFromNow = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
        const dates = []
        let currentDatePointer = new Date(oneYearAgo)

        while (currentDatePointer <= oneYearFromNow) {
            dates.push(currentDatePointer.toLocaleDateString())
            currentDatePointer.setDate(currentDatePointer.getDate() + 1)
        }

        return dates
    }
    
    const dates = generateDates();

    const renderDailyLog = dates.map((date) => {
        return (
            <Route path={`/log/${date}`} key={date} element={<DailyLog 
                date = {date}
                goalCalories={goalCalories}
                macronutrients={macronutrients}/>}></Route>
        )
    })

    return (
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home
                user={user}/>}></Route>
            {/* <Route path="/logoutpage" element={<LogoutPage/>}/> */}
            <Route path="/userprofile" element={<UserProfile 
                goalCalories={goalCalories} 
                setGoalCalories={setGoalCalories}
                macronutrients={macronutrients}
                user={user}/>}/>
            {renderDailyLog}
            {/* <Route path="/FindFood" element={<FindFood/>}></Route> */}
        </Routes>
    )
}

export default AllRoutes;