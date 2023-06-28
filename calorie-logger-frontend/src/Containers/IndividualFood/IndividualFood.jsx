import './IndividualFood.css';
import { useState, useEffect} from 'react';


const IndividualFood = (props) => {
    const {item, mealType, eatenFoodList, setEatenFoodList} = props;

    const [clicked, setClicked] = useState(false)
    const [foodWeight, setFoodWeight] = useState(item.measures[0].weight)

    const changeFoodWeight = (event) => {
        setFoodWeight(event.target.value)
    }

    const changeClicked = () => {
        setClicked(!clicked)
    }

    const nutritionPerGram = {
        calories: (item.food.nutrients.ENERC_KCAL/item.measures[0].weight),
        protein: (item.food.nutrients.PROCNT/item.measures[0].weight),
        fat: (item.food.nutrients.FAT/item.measures[0].weight),
        carbohydrate: (item.food.nutrients.CHOCDF/item.measures[0].weight)
    }

    const [displayNutrients, setDisplayNutrients] = useState({
        mealType: mealType,
        name: item.food.label,
        amount: parseInt(foodWeight),
        calories: parseInt(nutritionPerGram.calories*foodWeight),
        protein: parseInt(nutritionPerGram.protein*foodWeight),
        fat: parseInt(nutritionPerGram.fat*foodWeight),
        carbohydrate: parseInt(nutritionPerGram.carbohydrate*foodWeight)
    })

    useEffect(() => {
        setDisplayNutrients({
            mealType: mealType,
            name: item.food.label,
            amount: parseInt(foodWeight),
            calories: parseInt(nutritionPerGram.calories*foodWeight),
            protein: parseInt(nutritionPerGram.protein*foodWeight),
            fat: parseInt(nutritionPerGram.fat*foodWeight),
            carbohydrate: parseInt(nutritionPerGram.carbohydrate*foodWeight)
        })
    }, [foodWeight])

    const addFoodToLog = () => {
        const tempEatenFoodList = eatenFoodList
        tempEatenFoodList[mealType].push(displayNutrients)
        setEatenFoodList(tempEatenFoodList)
        changeClicked()
    }

    return (
        <li>
            {clicked == false ?
            <div onClick={changeClicked}>
                <h3 >{item.food.label}</h3>
                <p>{item.food.brand}: {(item.food.nutrients.ENERC_KCAL).toFixed()} calories per {(item.measures[0].weight.toFixed())} grams</p>
            </div>
             : 
            <div>
                <div onClick={changeClicked}>
                    <h3>{item.food.label}</h3>
                    <div >
                        <h4>{displayNutrients.calories} Calories</h4>
                        <h5>{displayNutrients.protein}g Protein</h5>
                        <h5>{displayNutrients.fat}g Fat</h5>
                        <h5>{displayNutrients.carbohydrate}g Carbohydrate</h5>
                    </div>
                </div>
                <div>
                    <input type="number" defaultValue={item.measures[0].weight.toFixed()} onChange={changeFoodWeight}></input> Grams
                </div>
                <button onClick={addFoodToLog}>Add Food</button>
                
            </div>}
        </li>
    )
}

export default IndividualFood;