import './FindFood.css';
import { useEffect, useState } from 'react';
import apiInfo from "../../config.js";
import IndividualFood from '../IndividualFood/IndividualFood';

const FindFood = (props) => {

    const {mealType, setFindFoodClicked, eatenFoodList, setEatenFoodList} = props;

    const [foodList, setFoodList] = useState()
    const [searchValue, setSearchValue] = useState()

    const updateSearchValue = (event) => {
        const input = event.target.value
        const cleanInput = input.replace(/\s/g, "%20")
        setSearchValue(cleanInput)
    }

    async function foodFetch() {
        const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${apiInfo.appId}&app_key=%20${apiInfo.apiKey}%09&ingr=${searchValue}&nutrition-type=logging`, {
        method: "GET",
        contentType: 'application/json',
        })
        const data = await response.json()
        console.log(data.hints)
        const mappedFoodItems = data.hints.map((item) => {
            return (
                <IndividualFood
                    item={item}
                    mealType={mealType}
                    eatenFoodList={eatenFoodList}
                    setEatenFoodList={setEatenFoodList}
                    />
            )
        })
        setFoodList(mappedFoodItems)
    }

    // upc https://api.edamam.com/api/food-database/v2/parser?app_id=932a20f2&app_key=%20577cb6b0089814cd8e636dd9c2fc554a%09&upc=026200117058&nutrition-type=logging&category=packaged-foods

    console.log(foodList)

    const switchToDailyLog = () => {
        setFindFoodClicked(false)
    }

    return (
        <div>
            <div>
                <h2>Add to {mealType}</h2>
                <button onClick={switchToDailyLog}>Back</button>
                <input type="text" placeholder="Search For Food" onChange={updateSearchValue}></input>
                <button onClick={foodFetch}>Search</button>
            </div>
            <ul>
                {foodList}
            </ul>
        </div>
    )
}

export default FindFood;