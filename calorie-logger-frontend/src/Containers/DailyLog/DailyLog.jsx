import './DailyLog.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const DailyLog = (props) => {

    const {date, goalCalories, macronutrients} = props;

    const curDate = new Date()
    const curDateStr = curDate.toLocaleDateString()

    const [yesterdayDate, setYesterdayDate] = useState(null);

    const handleBackClick = () => {
        const previousDate = new Date(yesterdayDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setYesterdayDate(previousDate.toLocaleDateString());
    };

    const yesterdayDateString = yesterdayDate || curDateStr

    return (
        <div>
            <h1>Daily log: {date}</h1>
            <Link to={`/log/${yesterdayDateString}`} onClick={handleBackClick}>Yesterday</Link>
            {/* <Link to={`/log/${tomorrowDateString}`}>Tomorrow</Link> */}
        </div>
    )
}

export default DailyLog;