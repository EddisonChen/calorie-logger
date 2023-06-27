import './FindFood.css';
import { useEffect, useState } from 'react';
import apiInfo from "../../config.js";
import IndividualFood from '../IndividualFood/IndividualFood';

const FindFood = () => {

    const [foodList, setFoodList] = useState()
    const [searchType, setSearchType] = useState("generic-foods")

    async function foodFetch(event) {
        const input = event.target.value
        const cleanInput = input.replace(/\s/g, "%20")
        const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${apiInfo.appId}&app_key=%20${apiInfo.apiKey}%09&ingr=${cleanInput}&nutrition-type=logging`, {
            method: "GET",
            contentType: 'application/json',
        })
        const data = await response.json()
        const mappedFoodItems = data.map((item) => {
            return (
                // <li>{item.name}</li>
                <IndividualFood 
                    item={item}/>
            )
        })
        setFoodList(mappedFoodItems)
    }

    console.log(foodList)

    return (
        <div>
            <input type="text" placeholder="Search For Food" onChange={foodFetch}></input>
            <ul>
                {foodList}
            </ul>
        </div>
    )
}

export default FindFood;