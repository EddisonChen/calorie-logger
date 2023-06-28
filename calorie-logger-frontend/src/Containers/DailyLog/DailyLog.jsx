import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FindFood from '../FindFood/FindFood';
import AdjustFood from '../../Components/AdjustFood/AdjustFood';

const DailyLog = (props) => {

    const {date, goalCalories, macronutrients} = props;

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

    const [eatenFoodList, setEatenFoodList] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
    })

    const removeFood = (mealType, index) => {
        setEatenFoodList(prevList => {
          const updatedList = {
            ...prevList,
            [mealType]: prevList[mealType].filter((_, i) => i !== index)
          };
          return updatedList;
        });
    };

    // console.log(eatenFoodList)

    const [selectedMealIndex, setSelectedMealIndex] = useState(null)

    const changeClicked = (mealType, index) => {
        setSelectedMealIndex(mealType + index)
    }

    const mappedBreakfast = eatenFoodList.breakfast.map((foodItem, index) => {  
        return (
            <ul key = {index}>
                {selectedMealIndex !== mealType + index ? <li onClick={() => changeClicked(foodItem.mealType, index)}>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li> :
                <AdjustFood
                    foodItem={foodItem}
                    eatenFoodList={eatenFoodList}
                    setEatenFoodList={setEatenFoodList}
                    index={index}
                    changeClicked={changeClicked}/> }
                <button onClick={() => removeFood('breakfast', index)}>Remove</button>
            </ul>
        )
    })
    const mappedLunch = eatenFoodList.lunch.map((foodItem, index) => {
        return (
            <ul>
                <li>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li>
                <button onClick={() => removeFood('lunch', index)}>Remove</button>
            </ul>
        )
    })
    const mappedDinner = eatenFoodList.dinner.map((foodItem, index) => {
        return (
            <ul>
                <li>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li>
                <button onClick={() => removeFood('dinner', index)}>Remove</button>
            </ul>
        )
    })
    const mappedSnack = eatenFoodList.snack.map((foodItem, index) => {
        return (
            <ul>
                <li>{foodItem.name}, {foodItem.amount} grams, {foodItem.calories} calories</li>
                <button onClick={() => removeFood('snack', index)}>Remove</button>
            </ul>
        )
    })


    const switchToFindFood = (event) => {
        setFindFoodClicked(true)
        setMealType(event.target.value)
    }

    return ( // be able to click on the food and adjust the amount
        <div>
            {findFoodClicked == false ? <div>
            <div>
                <Link to={`/log/${pastDate}`}>{`<`}</Link>
                <h1>Daily log: {date}</h1>
                <Link to={`/log/${futureDate}`}>{`>`}</Link>
            </div>
            <div>
                <p>{goalCalories} - {dailyCaloriesEaten} = {remainingCalories} calories remaining</p>
            </div>
            <div>
                <h3>Breakfast</h3>
                {mappedBreakfast}
                <button value="breakfast" onClick={switchToFindFood}>Add Food</button>
            </div>
            <div>
                <h3>Lunch</h3>
                {mappedLunch}
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
            </div> : 
            <FindFood
                mealType={mealType}
                setFindFoodClicked={setFindFoodClicked}
                eatenFoodList={eatenFoodList}
                setEatenFoodList={setEatenFoodList}/>}
             
        </div>
    )
}

export default DailyLog;