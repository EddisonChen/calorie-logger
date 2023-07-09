import "./NutrientSummary.css";
import {useState, useEffect} from 'react';

const NutrientSummary = (props) => {

    const {goalProtein, goalCarbohydrate, goalFat, fetchedFoodData} = props;

    const [eatenMacronutrients, setEatenMacronutrients] = useState({
        carbohydrate: 0,
        protein: 0,
        fat: 0
    })

    useEffect(() => {
        let sumCarb = 0;
        let sumProtein = 0;
        let sumFat = 0;
        for (let i = 0; i < fetchedFoodData.length; i ++) {
            sumCarb += fetchedFoodData[i].carbohydrate
            sumProtein += fetchedFoodData[i].protein
            sumFat += fetchedFoodData[i].Fat
        }
        setEatenMacronutrients({
            carbohydrate: sumCarb,
            protein: sumProtein,
            fat: sumFat
        })
    }, [fetchedFoodData])

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
                    <td>{goalProtein}g</td>
                    <td>{goalCarbohydrate}g</td>
                    <td>{goalFat}g</td>
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