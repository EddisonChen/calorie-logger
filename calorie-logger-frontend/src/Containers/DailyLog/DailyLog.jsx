import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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

    

    console.log(tomStr)

    return (
        <div>
            <h1>Daily log: {date}</h1>
            <Link to={`/log/${pastDate}`}>Yesterday</Link>
            <Link to={`/log/${futureDate}`}>Tomorrow</Link>
        </div>
    )
}

export default DailyLog;