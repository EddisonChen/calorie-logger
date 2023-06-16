import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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

    return (
        <div>
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
            </div>
            <div>
                <h3>Lunch</h3>
            </div>
            <div>
                <h3>Dinner</h3>
            </div>
            <div>
                <h3>Snack</h3>
            </div>
            
        </div>
    )
}

export default DailyLog;