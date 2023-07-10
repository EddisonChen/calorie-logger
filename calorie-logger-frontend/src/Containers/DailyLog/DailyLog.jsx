import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FindFood from '../FindFood/FindFood';
import AdjustFood from '../../Components/AdjustFood/AdjustFood';
import NutrientSummary from '../NutrientSummary/NutrientSummary';

const DailyLog = (props) => {

    const {date, fetchedUserDetails, user} = props;

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
    
    const [fetchedFoodData, setFetchedFoodData] = useState([])
    const [refreshFetch, setRefreshFetch] = useState(false)

    useEffect(()=> {
        const fetchTodayFood = async () => {
            const cleanUserId = (user.sub).replace(/\|/g, "%7C");
            const response = await fetch(`http://localhost:8080/api/foods/${formattedDate}?userId=${cleanUserId}`, {
                method: "GET",
                contentType: "application/json"
            });
            const data = await response.json()
            setFetchedFoodData(data)
        }
        fetchTodayFood()
    }, [refreshFetch])

    const removeFoodRequest = async (foodId) => {
        const cleanUserId = (user.sub).replace(/\|/g, "%7C");
        await fetch(`http://localhost:8080/api/foods/${foodId}?userId=${cleanUserId}`, {
            method: "DELETE"
        }).then(() => {
            console.log("Delete Sucesssful")
            setRefreshFetch(!refreshFetch)
        }).catch(()=> {
            console.log("Delete Failed")
        })
    }

    const removeFood = (foodId) => {
        removeFoodRequest(foodId)
    };

    const [selectedMealIndex, setSelectedMealIndex] = useState(null)
    const expandOrContractLogFood = (id) => {
        setSelectedMealIndex(id)
    }

    console.log(fetchedFoodData)

    const mappedBreakfast = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "breakfast"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id} className="log-food-list">
                <div className="log-food-list-item-container">
                    {selectedMealIndex !== foodItem.id ? <li className="collapsed-food-item" onClick={() => expandOrContractLogFood(foodItem.id)}>
                        <div className="collapsed-food-item">
                            <p className="food-title">{foodItem.name}</p>
                            <p className="food-info">{foodItem.amount} grams, {foodItem.calories} calories</p>
                        </div></li> :
                    <AdjustFood
                        formattedDate={formattedDate}
                        user={user}
                        foodItem={foodItem}
                        expandOrContractLogFood={expandOrContractLogFood}
                        setRefreshFetch={setRefreshFetch}
                        refreshFetch={refreshFetch}/>}
                    <button onClick={() => removeFood(foodItem.id)} className='remove-button button'>🗑️</button>
                </div>
            </ul>
        )
    })
    const mappedLunch = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "lunch"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id} className="log-food-list">
                {selectedMealIndex !== foodItem.id ? <li className="collapsed-food-item" onClick={() => expandOrContractLogFood(foodItem.id)}>
                    <div>
                        <p className="food-title">{foodItem.name}</p>
                        <p className="food-info">{foodItem.amount} grams, {foodItem.calories} calories</p>
                    </div></li> :
                <AdjustFood
                    formattedDate={formattedDate}
                    user={user}
                    foodItem={foodItem}
                    expandOrContractLogFood={expandOrContractLogFood}
                    setRefreshFetch={setRefreshFetch}
                    refreshFetch={refreshFetch}/>}
                <button onClick={() => removeFood(foodItem.id)} className='remove-button button'>🗑️</button>
            </ul>
        )
    })
    const mappedDinner = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "dinner"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id} className="log-food-list">
                {selectedMealIndex !== foodItem.id ? <li className="collapsed-food-item" onClick={() => expandOrContractLogFood(foodItem.id)}>
                    <div>
                        <p className="food-title">{foodItem.name}</p>
                        <p className="food-info">{foodItem.amount} grams, {foodItem.calories} calories</p>
                    </div></li> :
                <AdjustFood
                    formattedDate={formattedDate}
                    user={user}
                    foodItem={foodItem}
                    expandOrContractLogFood={expandOrContractLogFood}
                    setRefreshFetch={setRefreshFetch}
                    refreshFetch={refreshFetch}/>}
                <button onClick={() => removeFood(foodItem.id)} className='remove-button button'>🗑️</button>
            </ul>
        )
    })
    const mappedSnack = fetchedFoodData.filter((foodItem) => {
        return foodItem.meal_type == "snack"
    }).map((foodItem) => {
        return (
            <ul key = {foodItem.id} className="log-food-list">
                {selectedMealIndex !== foodItem.id ? <li className="collapsed-food-item" onClick={() => expandOrContractLogFood(foodItem.mid)}>
                    <div>
                        <p className="food-title">{foodItem.name}</p>
                        <p className="food-info">{foodItem.amount} grams, {foodItem.calories} calories</p>
                    </div></li> :
                <AdjustFood
                    formattedDate={formattedDate}
                    user={user}
                    foodItem={foodItem}
                    expandOrContractLogFood={expandOrContractLogFood}
                    setRefreshFetch={setRefreshFetch}
                    refreshFetch={refreshFetch}/>}
                <button onClick={() => removeFood(foodItem.id)} className='remove-button button'>🗑️</button>
            </ul>
        )
    })

    const [breakfastCalories, setBreakfastCalories] = useState(0)
    const [lunchCalories, setLunchCalories] = useState(0)
    const [dinnerCalories, setDinnerCalories] = useState(0)
    const [snackCalories, setSnackCalories] = useState(0)

    useEffect(() => {
        let breakfastSum = 0
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            if (fetchedFoodData[i].meal_type == "breakfast") {
                breakfastSum += fetchedFoodData[i].calories
            }
            setBreakfastCalories(breakfastSum)
        }
        let lunchSum = 0
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            if (fetchedFoodData[i].meal_type == "lunch") {
                lunchSum += fetchedFoodData[i].calories
            }
        }
        setLunchCalories(lunchSum)
        let dinnerSum = 0
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            if (fetchedFoodData[i].meal_type == "dinner") {
                dinnerSum += fetchedFoodData[i].calories
            }
        }
        setDinnerCalories(dinnerSum)
        let snackSum = 0
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            if (fetchedFoodData[i].meal_type == "snack") {
                snackSum += fetchedFoodData[i].calories
            }
        }
        setSnackCalories(snackSum)
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

    const [nutrientSummaryOrCalSummary, setNutrientSummaryOrCalSummary] = useState("calorieSummary");

    const switchBetweenSummaries = (e) => {
        setNutrientSummaryOrCalSummary(e.target.value)
    }

    return (
        <div>
            {findFoodClicked == false ? <div>
            <div className="daily-log-header">
                <Link to={`/log/${pastDate}`} className="change-date-button">{`◄`}</Link>
                <h2>{date}</h2>
                <Link to={`/log/${futureDate}`} className="change-date-button">{`►`}</Link>
            </div>
            {nutrientSummaryOrCalSummary == "calorieSummary" ? <div className="daily-log-info">
                <table className="log-table">
                    <tbody>
                        <tr className="table-header-row">
                            <th className="table-value">Budget</th>
                            <th className="table-value">Food</th>
                            <th className="table-value">Remaining</th>
                        </tr>
                        <tr className="table-value-row">
                            <td className="table-value">{fetchedUserDetails.goal_calories}</td>
                            <td className="table-value">{dailyCaloriesEaten}</td>
                            <td className="table-value">{remainingCalories} cals.</td>
                        </tr>
                    </tbody>
                </table>
                <button className="log-summary-button" value="nutrientSummary" onClick={switchBetweenSummaries}>►</button>
            </div>: 
            <div>
                <NutrientSummary
                goalProtein={fetchedUserDetails.goal_protein}
                goalCarbohydrate={fetchedUserDetails.goal_carbohydrate}
                goalFat={fetchedUserDetails.goal_fat}
                fetchedFoodData={fetchedFoodData}
                switchBetweenSummaries={switchBetweenSummaries}
                />
            </div>}
            <div>
                <div className="meal-title-container">
                    <h4 className="meal-title">Breakfast</h4>
                    <p className="meal-calorie-value">{breakfastCalories} cals.</p>
                    <button value="breakfast" onClick={switchToFindFood} className="add-button button">➕</button>
                </div>
                {mappedBreakfast}
            </div>
            <div>
                <div className="meal-title-container">
                    <h4 className="meal-title">Lunch</h4>
                    <p className="meal-calorie-value">{lunchCalories} cals.</p>
                    <button value="lunch" onClick={switchToFindFood} className="add-button button">➕</button>
                </div>
                {mappedLunch}
            </div>
            <div>
                <div className="meal-title-container">
                    <h4 className="meal-title">Dinner</h4>
                    <p className="meal-calorie-value">{dinnerCalories} cals.</p>
                    <button value="dinner" onClick={switchToFindFood} className="add-button button">➕</button>
                </div>
                
                {mappedDinner}
            </div>
            <div className="log-snack-section">
                <div className="meal-title-container">
                    <h4 className="meal-title">Snack</h4>
                    <p className="meal-calorie-value">{snackCalories} cals.</p>
                    <button value="snack" onClick={switchToFindFood} className="add-button button">➕</button>
                </div>
                {mappedSnack}   
            </div>
            </div> : 
            <FindFood
                mealType={mealType}
                setFindFoodClicked={setFindFoodClicked}
                user={user}
                refreshFetch={refreshFetch}
                setRefreshFetch={setRefreshFetch}
                formattedDate={formattedDate}
                />}
             
        </div>
    )
}

export default DailyLog;