import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react';
import './UserProfile.css';

const UserProfile = (props) => {

    const {goalCalories, setGoalCalories, user, fetchedUserDetails} = props;

    const [unitType, setUnitType] = useState('');
    const [userPhysicalAttributes, setUserPhysicalAttributes] = useState({
        sex: '',
        height: '',
        weight: '',
        age: '',
        activityLevel: '1.2'
    });
    const [macronutrients, setMacronutrients] = useState({
        protein: ".3",
        fat: ".3",
        carbohydrate: ".4"
    });
    const [tdee, setTdee] = useState(null);
    const [userGoal, setUserGoal] = useState(tdee);
    const [heightInput, setHeightInput] = useState();

    console.log(fetchedUserDetails)

    const changeUserPhysicalAttributes = (event) => {
        const tempUserObject = userPhysicalAttributes;
        tempUserObject[event.target.name] = event.target.value;
        setUserPhysicalAttributes(tempUserObject)
        console.log(userPhysicalAttributes)
    }

    const changeHeightInput = () => {
        if (unitType == 'metric') {
            setHeightInput(<div className="user-profile-input-container"><input type="number" placeholder="Height in CM" name="height" onChange={changeUserPhysicalAttributes} className="user-profile-input"></input></div>)
        } else if (unitType == 'imperial') {
            setHeightInput(
                <div className="user-profile-input-container">
                    <select name="height" className="user-profile-input" onChange={changeUserPhysicalAttributes} defaultValue={"DEFAULT"}>
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
                </div>
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
                <h3 className="info-header">Your Prior Information</h3>
                <p className="info-statement">Please fill out the above form if any factors have changed.</p>
                <div className="user-info-table-container">
                <table className="user-info-table">
                    <tbody>
                        <tr>
                            <th className="table-value">Sex</th>
                            <th className="table-value">Height</th>
                            <th className="table-value">Weight</th>
                            <th className="table-value">Age</th>
                            <th className="table-value">TDEE</th>
                        </tr>
                        <tr>
                            <td className="table-value">{fetchedUserDetails.sex}</td>
                            <td className="table-value">{fetchedUserDetails.height} {heightUnit}</td>
                            <td className="table-value">{fetchedUserDetails.weight} {weightUnit}</td>
                            <td className="table-value">{fetchedUserDetails.age}</td>
                            <td className="table-value">{previousTdee} cal.</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                
                <table className="macronutrients-table">
                    <tbody>
                        <tr>
                            <th className="table-value">Daily Cal.</th>
                            <th className="table-value">Daily Protein</th>
                            <th className="table-value">Daily Carb.</th>
                            <th className="table-value">Daily Fat</th>
                        </tr>
                        <tr>
                            <td className="table-value">{fetchedUserDetails.goal_calories}</td>
                            <td className="table-value">{fetchedUserDetails.goal_protein}g</td>
                            <td className="table-value">{fetchedUserDetails.goal_carbohydrate}g</td>
                            <td className="table-value">{fetchedUserDetails.goal_fat}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
    }

    useEffect(displayPreviousInfo, [fetchedUserDetails])

    return (
            <div>
                <h3 className="user-profile-header">{user.name}'s Profile</h3>
                <form className="user-profile-input-form">
                    <div className="user-profile-input-container">
                        <div><input type="radio" name="unitType" value="imperial" onClick={changeUnitType}></input>Imperial</div>
                        <div><input type="radio" name="unitType" value="metric" onClick={changeUnitType}></input>Metric</div>
                    </div>
                    
                    <div className="user-profile-input-container">
                        <input type="number" name="age" placeholder="Age" className="user-profile-input" onChange={changeUserPhysicalAttributes}></input>
                    </div>
                    
                    <div className="user-profile-input-container">
                        <div><input type="radio" name="sex" value="male" onClick={changeUserPhysicalAttributes}></input>Male</div>
                        <div><input type="radio" name="sex" value="female" onClick={changeUserPhysicalAttributes}></input>Female</div>
                    </div>
                    
                    {heightInput}
                    {unitType == "" ? '' : 
                        <div className="user-profile-input-container">
                            <input type="number" name="weight" className="user-profile-input" placeholder={unitType == "metric" ? "Weight in KG" : "Weight in LBs"} onChange={changeUserPhysicalAttributes}></input>
                        </div>}
                    <div className="user-profile-input-container">
                        <select name="activityLevel" onChange={changeUserPhysicalAttributes} className="user-profile-input">
                            <option value="1.2">Sedentary</option>
                            <option value="1.375">Lightly Active</option>
                            <option value="1.55">Moderately Active</option>
                            <option value="1.725">Highly Active</option>
                            <option value="1.9">Athlete</option>
                        </select>
                    </div>
                    
                    <div className="user-profile-input-container">
                        <select name="goal" onChange={changeUserGoal} defaultValue={"DEFAULT"} className="user-profile-input">
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
                    </div>
                    <div className="user-profile-input-container">
                        <button type="button" onClick={calculateTdee} className="user-profile-submit-button button">Update</button>
                    </div>
                    
                </form>
                
                {tdee == null ? <p className="incomplete-form-message">Please fill out the entire form to recalculate.</p> : 
                <div>
                    <h3 className="info-header">Your Updated Information</h3>
                    <p className="info-statement">Your estimated total daily energy expenditure is {tdee} calories per day.</p>
                    <p className="info-statement">In accordance with your goals, you should eat {goalCalories} calories per day.</p>
                    <h3 className="info-header">Adjust Calories</h3>
                    <div className="adjust-calories-form">
                        <button className="adjust-calories-button button" onClick={changeGoalCalories}>-</button>
                        <h4 className="adjust-calories-value">{goalCalories}</h4>
                        <button className="adjust-calories-button button" onClick={changeGoalCalories}>+</button>
                    </div>
                   
                    <table className="macronutrients-table">
                        <tbody >
                            <tr>
                                <th className="table-value">Carb.</th>
                                <th className="table-value">Protein</th>
                                <th className="table-value">Fat</th>
                            </tr>
                            <tr>
                                <td className="table-value">40%</td>
                                <td className="table-value">30%</td>
                                <td className="table-value">30%</td>
                            </tr>
                            <tr>
                                <td className="table-value">{((macronutrients.carbohydrate*goalCalories)/4).toFixed()}g</td>
                                <td className="table-value">{((macronutrients.protein*goalCalories)/4).toFixed()}g</td>
                                <td className="table-value">{((macronutrients.fat*goalCalories)/9).toFixed()}g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
                {fetchedUserDetails && !tdee && previousInfo}
                
            </div>
    )
}

 export default UserProfile;