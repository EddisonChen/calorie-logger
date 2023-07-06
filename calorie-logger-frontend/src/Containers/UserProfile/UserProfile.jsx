import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react';
import './UserProfile.css';

const UserProfile = (props) => {

    const {goalCalories, setGoalCalories, macronutrients, user, fetchedUserDetails} = props;

    const [unitType, setUnitType] = useState('');
    const [userPhysicalAttributes, setUserPhysicalAttributes] = useState({
        sex: '',
        height: '',
        weight: '',
        age: '',
        activityLevel: '1.2'
    });
    const [tdee, setTdee] = useState(null);
    const [userGoal, setUserGoal] = useState(tdee);
    const [heightInput, setHeightInput] = useState();
    // const [fetchedUserDetails, setFetchedUserDetails] = useState();

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         const cleanUrl = (user.sub).replace(/\|/g, "%7C")
    //         const response = await fetch(`http://localhost:8080/api/users/${cleanUrl}`, {
    //             method: "GET",
    //             contentType: "application/json",
    //         })
    //         const data = await response.json()
    //         setFetchedUserDetails(data)
    //     }
    //     fetchUserDetails()
    // }, [])

    console.log(fetchedUserDetails)

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
                    <select name="height" onChange={changeUserPhysicalAttributes} defaultValue={"DEFAULT"}>
                        <option value="DEFAULT" disabled> -- Select Your Height --</option>
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

    const calculateTdee = () => {
        if (userPhysicalAttributes.age !== '' && userPhysicalAttributes.height !== '' && userPhysicalAttributes.weight !== '' && userPhysicalAttributes.sex !== '') {
            let convertedHeight = parseInt(userPhysicalAttributes.height);
        let convertedWeight = parseInt(userPhysicalAttributes.weight);
        let sexValue = null;
        if (unitType == "imperial") {
            convertedHeight = convertedHeight*2.54;
            convertedWeight = convertedWeight*.454;
        }
        userPhysicalAttributes.sex == "male" ? sexValue = 5 : sexValue = -161
        setTdee((((10*convertedWeight) + (6.25*convertedHeight) - 5*parseInt(userPhysicalAttributes.age) + sexValue) * userPhysicalAttributes.activityLevel).toFixed())
        }
    }

    useEffect(()=> {
        setGoalCalories(parseInt(tdee) + parseInt(userGoal))
    }, [tdee])

    useEffect(() => {
        const updateUserProfile = async () => {
            const cleanUrl = (user.sub).replace(/\|/g, "%7C")
            const putReponse = await fetch(`http://localhost:8080/api/users/${cleanUrl}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    sex: userPhysicalAttributes.sex,
                    unit_type: unitType,
                    height: parseInt(userPhysicalAttributes.height),
                    weight: parseInt(userPhysicalAttributes.weight),
                    age: parseInt(userPhysicalAttributes.age),
                    activity_level: parseInt(userPhysicalAttributes.activityLevel),
                    goal: parseInt(userGoal),
                    goal_calories: goalCalories,
                    goal_protein: parseInt((macronutrients.protein*goalCalories)/4),
                    goal_carbohydrate: parseInt((macronutrients.carbohydrate*goalCalories)/4),
                    goal_fat: parseInt((macronutrients.fat*goalCalories)/9)
                })
            })
            console.log(putReponse)
        }
        updateUserProfile()
    }, [goalCalories])

    const changeGoalCalories = (event) => {
        if (event.target.innerHTML == "-") {
            setGoalCalories(goalCalories - 10);
        } else {
            setGoalCalories(goalCalories + 10)
        }
    }

    const [previousInfo, setPreviousInfo] = useState(null)

    const displayPreviousInfo = () => {
        let heightUnit = undefined;
        let weightUnit = undefined;
        if (fetchedUserDetails) {
            if (fetchedUserDetails.unit_type == "imperial") {
                heightUnit = "In."
                weightUnit = "Lbs"
            } else {
                heightUnit = "Cm"
                weightUnit = "Kg"
            }
        const previousTdee = fetchedUserDetails.goal_calories - fetchedUserDetails.goal
        
        setPreviousInfo(
            <div>
                <h4>Your Prior Information</h4>
                <p>Please fill out the above form to recalculate if any factors have changed.</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Sex</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Age</th>
                            <th>TDEE</th>
                        </tr>
                        <tr>
                            <td>{fetchedUserDetails.sex}</td>
                            <td>{fetchedUserDetails.height} {heightUnit}</td>
                            <td>{fetchedUserDetails.weight} {weightUnit}</td>
                            <td>{fetchedUserDetails.age}</td>
                            <td>{previousTdee} cal.</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>Daily Calories</th>
                            <th>Daily Protein</th>
                            <th>Daily Carbohydrates</th>
                            <th>Daily Fat</th>
                        </tr>
                        <tr>
                            <td>{fetchedUserDetails.goal_calories}</td>
                            <td>{fetchedUserDetails.goal_protein}g</td>
                            <td>{fetchedUserDetails.goal_carbohydrate}g</td>
                            <td>{fetchedUserDetails.goal_fat}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
    }

    useEffect(displayPreviousInfo, [fetchedUserDetails])

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
                    <select name="goal" onChange={changeUserGoal} value={"DEFAULT"}>
                        <option value="DEFAULT" disabled>-- Select Your Goal --</option>
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
                    <button type="button" onClick={calculateTdee}>Update</button>
                </form>
                
                {tdee == null ? <p>Please fill out the entire form.</p> : 
                <div>
                    <h5>Your Updated Information</h5>
                    <p>Your estimated total daily energy expenditure is {tdee} calories per day.</p>
                    <p>In accordance with your goals, you should eat {goalCalories} calories per day.</p>
                    <h3>Adjust Calories</h3>
                    <button onClick={changeGoalCalories}>-</button>
                    {goalCalories}
                    <button onClick={changeGoalCalories}>+</button>
                    
                    <table>
                        <tbody>
                        <tr>
                            <th>Carbohydrate</th>
                            <th>Protein</th>
                            <th>Fat</th>
                        </tr>
                        <tr>
                            <td>40%</td>
                            <td>30%</td>
                            <td>30%</td>
                        </tr>
                        <tr>
                            <td>{((macronutrients.carbohydrate*goalCalories)/4).toFixed()}g</td>
                            <td>{((macronutrients.protein*goalCalories)/4).toFixed()}g</td>
                            <td>{((macronutrients.fat*goalCalories)/9).toFixed()}g</td>
                        </tr>
                        </tbody>
                    </table>
                </div>}
                {fetchedUserDetails && !tdee && previousInfo}
                
            </div>
    )
}

 export default UserProfile;