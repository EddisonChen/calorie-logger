import "./AdjustFood.css";
import {useState, useEffect} from 'react'

const AdjustFood = (props) => {
    const {foodItem, expandOrContractLogFood, refreshFetch, setRefreshFetch, user, formattedDate} = props;

    const [foodWeight, setFoodWeight] = useState(foodItem.amount)

    const changeFoodWeight = (event) => {
        setFoodWeight(event.target.value)
    }

    const nutritionPerGram = {
        calories: foodItem.calories/foodItem.amount,
        protein: foodItem.protein/foodItem.amount,
        fat: foodItem.fat/foodItem.amount,
        carbohydrate: foodItem.carbohydrate/foodItem.amount
    }

    const [displayNutrients, setDisplayNutrients] = useState({
        mealType: foodItem.mealType,
        name: foodItem.name,
        amount: foodItem.amount,
        calories: foodItem.calories,
        protein: foodItem.protein,
        fat: foodItem.fat,
        carbohydrate: foodItem.carbohydrate
    })

    useEffect(() => {
        setDisplayNutrients({
            mealType: foodItem.mealType,
            name: foodItem.name,
            amount: parseInt(foodWeight),
            calories: parseInt(nutritionPerGram.calories*foodWeight),
            protein: parseInt(nutritionPerGram.protein*foodWeight),
            fat: parseInt(nutritionPerGram.fat*foodWeight),
            carbohydrate: parseInt(nutritionPerGram.carbohydrate*foodWeight)
        })
    }, [foodWeight])

    const putFoodInDB = async () => {
        const cleanUserId = (user.sub).replace(/\|/g, "%7C")
        const response = await fetch(`http://localhost:8080/api/foods/${foodItem.id}?userId=${cleanUserId}`, {
            method: "PUT",
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                date: formattedDate,
                meal_type: foodItem.meal_type,
                name: foodItem.name,
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

    const updateFood = () => {
        putFoodInDB()
        expandOrContractLogFood(null)
    }

    const cancelAdjustment = () => {
        expandOrContractLogFood(null)
    }

    return (
        <div>
            <div onClick={cancelAdjustment}>
                <h4>{foodItem.name}</h4>
            <div>
                <h4>{displayNutrients.calories} Calories</h4>
                <h5>{displayNutrients.protein}g Protein</h5>
                <h5>{displayNutrients.fat}g Fat</h5>
                <h5>{displayNutrients.carbohydrate}g Carbohydrate</h5>
            </div>
            </div>
            <div>
                <input type="number" defaultValue={foodItem.amount} onChange={changeFoodWeight}></input> Grams
            </div>
            <button onClick={updateFood}>Update Food</button>


        </div>
    )
}

export default AdjustFood;