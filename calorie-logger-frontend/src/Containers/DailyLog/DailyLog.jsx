import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FindFood from '../FindFood/FindFood';

const DailyLog = (props) => {

    const {date, goalCalories, macronutrients, index} = props;

    const currentDate = new Date(date);

    const yesterdayDate = new Date(currentDate.setDate(currentDate.getDate()-1))
    const yesStr = yesterdayDate.toLocaleDateString()

    const tomorrowDate = new Date(currentDate)
    tomorrowDate.setDate(currentDate.getDate() + 2)
    const tomStr = tomorrowDate.toLocaleDateString()

    const [pastDate, setPastDate] = useState(yesStr)
    const [futureDate, setFutureDate] = useState(tomStr)

    const [dailyCaloriesEaten, setDailyCaloriesEaten] = useState(0)
    const [remainingCalories, setRemainingCalories] = useState(goalCalories-dailyCaloriesEaten)
    const [findFoodClicked, setFindFoodClicked] = useState(false)
    const [mealType, setMealType] = useState()

    // useEffect(() => {
    //     for (let i = 0; i < )

    // }, [breakfastFood, lunchFood, dinnerFood, snackFood])

    // console.log(breakfastFood)

    const switchToFindFood = (event) => {
        setFindFoodClicked(true)
        setMealType(event.target.value)
    }

    return ( // add remove food button and show the list of foods per meal
        <div>
            {findFoodClicked == false ? <div>
            <div>
                <Link to={`/log/${pastDate}`}>{`<`}</Link>
                <h1>Daily log: {date}</h1>
                <Link to={`/log/${futureDate}`}>{`>`}</Link>
            </div>
            <div>
                <p>{goalCalories} - {dailyCaloriesEaten} = {remainingCalories}</p>
            </div>
            <div>
                <h3>Breakfast</h3>
                <button value="breakfast" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Lunch</h3>
                <button value="lunch" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Dinner</h3>
                <button value="dinner" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Snack</h3>
                <button value="snack" onClick={switchToFindFood}>Add Food</button>
            </div>
            </div> : 
            <FindFood
                mealType={mealType}
                setFindFoodClicked={setFindFoodClicked}/>}
             
        </div>
    )
}

export default DailyLog;