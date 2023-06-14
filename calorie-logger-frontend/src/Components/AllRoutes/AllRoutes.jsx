import {useLocation, Routes, Route} from 'react-router-dom';
import LogoutPage from '../LogoutPage/LogoutPage';
import UserProfile from '../UserProfile/UserProfile';
import { useState, useEffect } from 'react';

const AllRoutes = () => {

    const location = useLocation();

    const [goalCalories, setGoalCalories] = useState(null);
    const [macronutrients, setMacronutrients] = useState({
        protein: ".3",
        fat: ".3",
        carbohydrate: ".4"
    });

    return (
        <Routes location={location} key={location.pathname}>
            {/* <Route path="/logoutpage" element={<LogoutPage/>}/> */}
            <Route path="/userprofile" element={<UserProfile 
                goalCalories={goalCalories} 
                setGoalCalories={setGoalCalories}
                macronutrients={macronutrients}
                setMacronutrients={setMacronutrients}/>}/>
        </Routes>
    )
}

export default AllRoutes;