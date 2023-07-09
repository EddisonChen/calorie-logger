import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FindFood from '../FindFood/FindFood';
import AdjustFood from '../../Components/AdjustFood/AdjustFood';
import NutrientSummary from '../NutrientSummary/NutrientSummary';

const DailyLog = (props) => {

    const {date, fetchedUserDetails, user} = props;

    console.log(fetchedUserDetails)

    const currentDate = new Date(date);

    const yesterdayDate = new Date(currentDate.setDate(currentDate.getDate()-1))
    const yesStr = yesterdayDate.toLocaleDateString()

    const tomorrowDate = new Date(currentDate)
    tomorrowDate.setDate(currentDate.getDate() + 2)
    const tomStr = tomorrowDate.toLocaleDateString()

    const [pastDate, setPastDate] = useState(yesStr)
    const [futureDate, setFutureDate] = useState(tomStr)

    const [dailyCaloriesEaten, setDailyCaloriesEaten] = useState(0)
    const [remainingCalories, setRemainingCalories] = useState(fetchedUserDetails.goal_calories-dailyCaloriesEaten)
    const [findFoodClicked, setFindFoodClicked] = useState(false)
    const [mealType, setMealType] = useState()

    const dateSplit = date.split('/')
    const day = dateSplit[1]
    const month = dateSplit[0]
    const year = dateSplit[2]
    const [formattedDate, setFormattedDate] = useState(`${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`);

    console.log(formattedDate)
    
    const [fetchedFoodData, setFetchedFoodData] = useState([])

    const fetchTodayFood = async () => {
        console.log(formattedDate)
        const cleanUserId = (user.sub).replace(/\|/g, "%7C");
        const response = await fetch(`http://localhost:8080/api/foods/${formattedDate}?userId=${cleanUserId}`, {
            method: "GET",
            contentType: "application/json"
        });
        const data = await response.json()
        setFetchedFoodData(data)
    }

    useEffect(()=> {
        fetchTodayFood()
    }, [])

    const removeFoodRequest = async (foodId) => {
        const cleanUserId = (user.sub).replace(/\|/g, "%7C");
        await fetch(`http://localhost:8080/api/foods/${foodId}?userId=${cleanUserId}`, {
            method: "DELETE"
        }).then(() => {
            console.log("Delete Sucesssful")
        }).catch(()=> {
            console.log("Delete Failed")
        })
        fetchTodayFood()
    }

    const removeFood = (foodId) => {
        removeFoodRequest(foodId)
    };

    const [selectedMealIndex, setSelectedMealIndex] = useState(null)
    const changeClicked = (id) => {
        setSelectedMealIndex(id)
    }

    console.log(fetchedFoodData)

    const mappedBreakfast = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "breakfast"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id}>
                {selectedMealIndex !== foodItem.id ? <li onClick={() => changeClicked(foodItem.id)}>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li> :
                <AdjustFood
                    foodItem={foodItem}
                    changeClicked={changeClicked}/>}
                <button onClick={() => removeFood(foodItem.id)}>Remove</button>
            </ul>
        )
    })
    const mappedLunch = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "lunch"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id}>
                {selectedMealIndex !== foodItem.id ? <li onClick={() => changeClicked(foodItem.id)}>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li> :
                <AdjustFood
                    foodItem={foodItem}
                    changeClicked={changeClicked}/>}
                <button onClick={() => removeFood(foodItem.id)}>Remove</button>
            </ul>
        )
    })
    const mappedDinner = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "dinner"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id}>
                {selectedMealIndex !== foodItem.id ? <li onClick={() => changeClicked(foodItem.id)}>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li> :
                <AdjustFood
                    foodItem={foodItem}
                    changeClicked={changeClicked}/>}
                <button onClick={() => removeFood(foodItem.id)}>Remove</button>
            </ul>
        )
    })
    const mappedSnack = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "snack"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id}>
                {selectedMealIndex !== foodItem.id ? <li onClick={() => changeClicked(foodItem.mid)}>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li> :
                <AdjustFood
                    foodItem={foodItem}
                    changeClicked={changeClicked}/>}
                <button onClick={() => removeFood(foodItem.id)}>Remove</button>
            </ul>
        )
    })

    useEffect(() => {
        let sum = 0
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            sum += fetchedFoodData[i].calories
        }
        setDailyCaloriesEaten(sum)
    }, [fetchedFoodData])

    useEffect(() => {
        setRemainingCalories(fetchedUserDetails.goal_calories-dailyCaloriesEaten)
    }, [dailyCaloriesEaten])

    const switchToFindFood = (event) => {
        setFindFoodClicked(true)
        setMealType(event.target.value)
    }

    return ( // adjust serving units? might be an issue with the api return tbh
        <div>
            {findFoodClicked == false ? <div>
            <div>
                <Link to={`/log/${pastDate}`}>{`<`}</Link>
                <h1>Daily log: {date}</h1>
                <Link to={`/log/${futureDate}`}>{`>`}</Link>
            </div>
            <div>
                <p>{parseInt(fetchedUserDetails.goal_calories)} - {dailyCaloriesEaten} = {remainingCalories} calories remaining</p>
            </div>
            <div>
                <h3>Breakfast</h3>
                {mappedBreakfast}
                <button value="breakfast" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Lunch</h3>
                <button value="lunch" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Dinner</h3>
                {mappedDinner}
                <button value="dinner" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Snack</h3>
                {mappedSnack}
                <button value="snack" onClick={switchToFindFood}>Add Food</button>
            </div>
            <NutrientSummary
                goalProtein={fetchedUserDetails.goal_protein}
                goalCarbohydrate={fetchedUserDetails.goal_carbohydrate}
                goalFat={fetchedUserDetails.goal_fat}
                fetchedFoodData={fetchedFoodData}
                />
            </div> : 
            <FindFood
                mealType={mealType}
                setFindFoodClicked={setFindFoodClicked}
                />}
             
        </div>
    )
}

export default DailyLog;