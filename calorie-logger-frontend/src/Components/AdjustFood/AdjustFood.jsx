import "./AdjustFood.css";
import {useState, useEffect} from 'react'

const AdjustFood = (props) => {
    const {foodItem, eatenFoodList, setEatenFoodList, index, changeClicked} = props;

    // console.log(foodItem)

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

    // console.log(nutritionPerGram)

    const updateEatenFoodList = () => {
        setEatenFoodList(prevList => {
            const updatedList = {
              ...prevList,
              [foodItem.mealType]: prevList[foodItem.mealType].map((food, i) => {
                if (i === index) {
                  return displayNutrients;
                }
                return food;
              })
            };
            return updatedList;
          });
        changeClicked('none', -1)
    }

    return (
        <div>
            <h4>{foodItem.name}</h4>
            <div>
                <h4>{displayNutrients.calories} Calories</h4>
                <h5>{displayNutrients.protein}g Protein</h5>
                <h5>{displayNutrients.fat}g Fat</h5>
                <h5>{displayNutrients.carbohydrate}g Carbohydrate</h5>
            </div>
            <div>
                <input type="number" defaultValue={foodItem.amount} onChange={changeFoodWeight}></input> Grams
            </div>
            <button onClick={updateEatenFoodList}>Update Food</button>


        </div>
    )
}

export default AdjustFood;