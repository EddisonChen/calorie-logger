import './FindFood.css';
import { useEffect, useState } from 'react';
import apiInfo from "../../config.js";
import IndividualFood from '../IndividualFood/IndividualFood';

const FindFood = (props) => {

    const {mealType, setFindFoodClicked, user, formattedDate, refreshFetch, setRefreshFetch} = props;

    const [foodList, setFoodList] = useState()
    const [searchValue, setSearchValue] = useState()

    const updateSearchValue = (event) => {
        const input = event.target.value
        const cleanInput = input.replace(/\s/g, "%20")
        setSearchValue(cleanInput)
    }

    const switchToDailyLog = () => {
        setFindFoodClicked(false)
    }

    async function foodFetch(event) {
        event.preventDefault()
        const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${apiInfo.appId}&app_key=%20${apiInfo.apiKey}%09&ingr=${searchValue}&nutrition-type=logging`, {
            method: "GET",
            contentType: 'application/json',
        })
        const data = await response.json()
        console.log(data.hints)
        const mappedFoodItems = data.hints.map((item) => {
            return (
                <IndividualFood
                    key={item.food}
                    item={item}
                    mealType={mealType}
                    user={user}
                    refreshFetch={refreshFetch}
                    setRefreshFetch={setRefreshFetch}
                    formattedDate={formattedDate}
                    switchToDailyLog={switchToDailyLog}
                    />
            )
        })
        setFoodList(mappedFoodItems)
    }

    // upc https://api.edamam.com/api/food-database/v2/parser?app_id=932a20f2&app_key=%20577cb6b0089814cd8e636dd9c2fc554a%09&upc=026200117058&nutrition-type=logging&category=packaged-foods

    return (
        <div>
            <div>
                <div className='find-food-title-container'>
                    <button onClick={switchToDailyLog} className='back-button button'>Back</button>
                    <h3 className="find-food-title">Add to {mealType}</h3>  
                </div>
                <form className="food-search-container">
                    <input type="text" placeholder="Search For Food" onChange={updateSearchValue} className="food-search-bar"></input>
                    <input type="submit" onClick={foodFetch} className="submit-button button"></input>
                </form>
            </div>
            <ul className="food-list">
                {foodList}
            </ul>
        </div>
    )
}

export default FindFood;