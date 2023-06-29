import "./NutrientSummary.css";
import {useState, useEffect} from 'react';

const NutrientSummary = (props) => {

    const {eatenFoodList, macronutrients, goalCalories} = props;

    const [eatenMacronutrients, setEatenMacronutrients] = useState({
        carbohydrate: "0",
        protein: "0",
        fat: "0"
    })

    useEffect(() => {
        let sumCarb = 0;
        let sumProtein = 0;
        let sumFat = 0;
        for (let i = 0; i < eatenFoodList.breakfast.length; i ++) {
            sumCarb += eatenFoodList.breakfast[i].carbohydrate
            sumProtein += eatenFoodList.breakfast[i].protein
            sumFat += eatenFoodList.breakfast[i].fat
        }
        for (let i = 0; i < eatenFoodList.lunch.length; i ++) {
            sumCarb += eatenFoodList.lunch[i].carbohydrate
            sumProtein += eatenFoodList.lunch[i].protein
            sumFat += eatenFoodList.lunch[i].protein
        }
        for (let i = 0; i < eatenFoodList.dinner.length; i ++) {
            sumCarb += eatenFoodList.dinner[i].carbohydrate
            sumProtein += eatenFoodList.dinner[i].protein
            sumFat += eatenFoodList.dinner[i].fat
        }
        for (let i = 0; i < eatenFoodList.snack.length; i ++) {
            sumCarb += eatenFoodList.snack[i].carbohydrate
            sumProtein += eatenFoodList.snack[i].protein
            sumFat += eatenFoodList.snack[i].fat
        }
        setEatenMacronutrients({
            carbohydrate: sumCarb,
            protein: sumProtein,
            fat: sumFat
        })
    }, [eatenFoodList])

    return (
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <th>Carbohydrate</th>
                    <th>Protein</th>
                    <th>Fat</th>
                </tr>
                <tr>
                    <th>Target</th>
                    <td>{((macronutrients.carbohydrate*goalCalories)/4).toFixed()}g</td>
                    <td>{((macronutrients.protein*goalCalories)/4).toFixed()}g</td>
                    <td>{((macronutrients.fat*goalCalories)/9).toFixed()}g</td>
                </tr>
                <tr>
                    <th>Current</th>
                    <td>{eatenMacronutrients.carbohydrate}g</td>
                    <td>{eatenMacronutrients.protein}g</td>
                    <td>{eatenMacronutrients.fat}g</td>
                </tr>
            </tbody>
        </table>
    )
}

export default NutrientSummary;