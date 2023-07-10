import "./NutrientSummary.css";
import {useState, useEffect} from 'react';

const NutrientSummary = (props) => {

    const {goalProtein, goalCarbohydrate, goalFat, fetchedFoodData, switchBetweenSummaries} = props;

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
            sumFat += fetchedFoodData[i].fat
        }
        setEatenMacronutrients({
            carbohydrate: sumCarb,
            protein: sumProtein,
            fat: sumFat
        })
    }, [fetchedFoodData])

    return (
        <div className="daily-log-info">
            <button value="calorieSummary" className="log-summary-button" onClick={switchBetweenSummaries}>◄</button>
            <table className="nutrient-summary-table">
                <tbody>
                    <tr>
                        <td></td>
                        <th className="table-value">Carb.</th>
                        <th className="table-value">Protein</th>
                        <th className="table-value">Fat</th>
                    </tr>
                    <tr>
                        <th>Target:</th>
                        <td className="table-value">{goalProtein}g</td>
                        <td className="table-value">{goalCarbohydrate}g</td>
                        <td className="table-value">{goalFat}g</td>
                    </tr>
                    <tr>
                        <th>Current:</th>
                        <td className="table-value">{eatenMacronutrients.carbohydrate}g</td>
                        <td className="table-value">{eatenMacronutrients.protein}g</td>
                        <td className="table-value">{eatenMacronutrients.fat}g</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
}

export default NutrientSummary;