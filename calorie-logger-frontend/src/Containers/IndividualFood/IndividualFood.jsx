import './IndividualFood.css';
import { useState, useEffect} from 'react';


const IndividualFood = (props) => {
    const {item, mealType, user, formattedDate, refreshFetch, setRefreshFetch, switchToDailyLog} = props;

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
        switchToDailyLog()
    }

    return (
        <li>
            {expandListFood == false ?
            <div className="contracted-food-list-item" onClick={expandOrContractItem}>
                <p className="contracted-food-list-item-name">{item.food.label}</p>
                <p className="contracted-food-list-item-info">{item.food.brand}: {(item.food.nutrients.ENERC_KCAL).toFixed()} calories per {(item.measures[0].weight.toFixed())} grams</p>
            </div>
             : 
            <div className="expanded-food-list-item">
                <div onClick={expandOrContractItem}>
                    <h3 className="expanded-food-list-item-name">{item.food.label}</h3>
                    <div >
                        <p className="expanded-food-list-item-info">{displayNutrients.calories} Calories</p>
                        <p className="expanded-food-list-item-info">{displayNutrients.protein}g Protein</p>
                        <p className="expanded-food-list-item-info">{displayNutrients.fat}g Fat</p>
                        <p className="expanded-food-list-item-info">{displayNutrients.carbohydrate}g Carbohydrate</p>
                    </div>
                </div>
                <div className="change-add-food-weight-container">
                    <input type="number" defaultValue={item.measures[0].weight.toFixed()} onChange={changeFoodWeight} className="change-add-food-weight-input"></input> Grams
                </div>
                <button onClick={addFoodToLog} className="button">Add Food</button>
            </div>}
        </li>
    )
}

export default IndividualFood;