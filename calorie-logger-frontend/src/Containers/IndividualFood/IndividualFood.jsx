import './IndividualFood.css';
import { useState, useEffect} from 'react';


const IndividualFood = (props) => {
    const {item, mealType, user, formattedDate, refreshFetch, setRefreshFetch} = props;

    const [expandListFood, setExpandListFood] = useState(false)
    const [foodWeight, setFoodWeight] = useState(item.measures[0].weight)

    const changeFoodWeight = (event) => {
        setFoodWeight(event.target.value)
    }

    const expandOrContractItem = () => {
        setExpandListFood(!expandListFood)
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

    const postFoodToDB = async () => {
        const cleanUserId = (user.sub).replace(/\|/g, "%7C")
        const response = await fetch(`http://localhost:8080/api/foods?userId=${cleanUserId}`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                date: formattedDate,
                meal_type: mealType,
                name: item.food.label,
                amount: parseInt(foodWeight),
                calories: parseInt(nutritionPerGram.calories*foodWeight),
                protein: parseInt(nutritionPerGram.protein*foodWeight),
                fat: parseInt(nutritionPerGram.fat*foodWeight),
                carbohydrate: parseInt(nutritionPerGram.carbohydrate*foodWeight),
                user_id: user.sub
            })
        }).then(() => {
            setRefreshFetch(!refreshFetch)
        })
        console.log(response)
    }

    const addFoodToLog = () => {
        postFoodToDB()
        expandOrContractItem()
    }

    return (
        <li>
            {expandListFood == false ?
            <div onClick={expandOrContractItem}>
                <h3 >{item.food.label}</h3>
                <p>{item.food.brand}: {(item.food.nutrients.ENERC_KCAL).toFixed()} calories per {(item.measures[0].weight.toFixed())} grams</p>
            </div>
             : 
            <div>
                <div onClick={expandOrContractItem}>
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