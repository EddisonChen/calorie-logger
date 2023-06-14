import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react';

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0;

    // if (isLoading) {
    //     return <div>
    //         Loading...
    //     </div>
    // }

    const [unitType, setUnitType] = useState('');
    const [userPhysicalAttributes, setUserPhysicalAttributes] = useState({
        sex: '',
        height: '',
        weight: '',
        age: '',
        activityLevel: '1.2'
    });
    const [tdee, setTdee] = useState();
    const [userGoal, setUserGoal] = useState();
    const [heightInput, setHeightInput] = useState()

    const changeUserPhysicalAttributes = (event) => {
        const tempUserObject = userPhysicalAttributes;
        tempUserObject[event.target.name] = event.target.value;
        setUserPhysicalAttributes(tempUserObject)
        console.log(userPhysicalAttributes)
    }

    const changeHeightInput = () => {
        if (unitType == 'metric') {
            setHeightInput(<input type="number" placeholder="Height in CM" name="height" onChange={changeUserPhysicalAttributes}></input>)
        } else if (unitType == 'imperial') {
            setHeightInput(
                <label>Height
                    <select name="height" onChange={changeUserPhysicalAttributes}>
                        <option hidden disabled selected value> -- Select Your Height --</option>
                        <option value="55">4'7"</option>
                        <option value="56">4'8"</option>
                        <option value="57">4'9"</option>
                        <option value="58">4'10"</option>
                        <option value="59">4'11"</option>
                        <option value="60">5'0"</option>
                        <option value="61">5'1"</option>
                        <option value="62">5'2"</option>
                        <option value="63">5'3"</option>
                        <option value="64">5'4"</option>
                        <option value="65">5'5"</option>
                        <option value="66">5'6"</option>
                        <option value="67">5'7"</option>
                        <option value="68">5'8"</option>
                        <option value="69">5'9"</option>
                        <option value="70">5'10"</option>
                        <option value="71">5'11"</option>
                        <option value="72">6'0"</option>
                        <option value="73">6'1"</option>
                        <option value="74">6'2"</option>
                        <option value="75">6'3"</option>
                        <option value="76">6'4"</option>
                        <option value="77">6'5"</option>
                        <option value="78">6'6"</option>
                        <option value="79">6'7"</option>
                        <option value="80">6'8"</option>
                        <option value="81">6'9"</option>
                        <option value="82">6'10"</option>
                        <option value="83">6'11"</option>
                        <option value="84">7'0"</option>
                    </select>
                </label>
            )
        }
    }
    useEffect(changeHeightInput, [unitType])

    const changeUnitType = (event) => {
        setUnitType(event.target.value)   
    }
    const changeUserGoal = (event) => {
        setUserGoal(event.target.value)
    }

    console.log(unitType)

    return (
            <div>
                {/* <img src={user.picture} alt={user.name}/> */}
                {/* <h2>{user.name}</h2>
                <p>{user.email}</p> */}
                <h3>Your Profile</h3>

                <form>
                    <input type="radio" name="unitType" value="imperial" onClick={changeUnitType}></input>Imperial
                    <input type="radio" name="unitType" value="metric" onClick={changeUnitType}></input>Metric
                    <input type="number" name="age" placeholder="Age" onChange={changeUserPhysicalAttributes}></input>
                    <input type="radio" name="sex" value="male" onClick={changeUserPhysicalAttributes}></input>Male
                    <input type="radio" name="sex" value="female" onClick={changeUserPhysicalAttributes}></input>Female
                    {heightInput}
                    {unitType == "" ? '' : <input type="number" name="weight" placeholder={unitType == "metric" ? "Weight in KG" : "Weight in LBs"} onChange={changeUserPhysicalAttributes}></input>}
                    <select name="activityLevel" onChange={changeUserPhysicalAttributes}>
                        <option value="1.2">Sedentary</option>
                        <option value="1.375">Lightly Active</option>
                        <option value="1.55">Moderately Active</option>
                        <option value="1.725">Highly Active</option>
                        <option value="1.9">Athlete</option>
                    </select>
                    <select name="goal" onChange={changeUserGoal}>
                        <option hidden disabled selected value>-- Select Your Goal --</option>
                        <option value="-1000">Lose 2 LBs/.91 KGs Per Week</option>
                        <option value="-750">Lose 1.5 LBs/.68 KGs Per Week</option>
                        <option value="-500">Lose 1 LBs/.45 KGs Per Week</option>
                        <option value="-250">Lose .5 LBs/.23 KGs Per Week</option>
                        <option value="0">Maintain Weight</option>
                        <option value="250">Gain .5 LBs/.23 KGs Per Week</option>
                        <option value="500">Gain 1 LBs/.45 KGs Per Week</option>
                        <option value="750">Gain 1.5 LBs/.68 KGs Per Week</option>
                        <option value="1000">Gain 2 LBs/.91 KGs Per Week</option>
                    </select>
                    <input type="submit"></input>
                </form>
                
                
            </div>
    )
}

 export default UserProfile;