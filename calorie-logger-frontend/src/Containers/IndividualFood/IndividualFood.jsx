import './IndividualFood.css';
import { useState, useEffect} from 'react';


const IndividualFood = (props) => {
    const {item} = props;

    const [clicked, setClicked] = useState(false)
    // const [defaultServingSize, setDefaultServingSize] = useState()

    const changeClicked = () => {
        setClicked(!clicked)
    }

    // const mappedItemUnits = item.measures.map((unit) => {
    //     return (
    //         <option value={unit.label}>{unit.label}</option>   
    //     )
    // })

    // const changeDefaultServingSize = (event) => {
    //     for (let i = 0; i < item.measures.length()-1; i ++) {
    //         if (event.target.value == item.measures.label) {
    //             setDefaultServingSize(item.measures.weight)
    //         }
    //     }
    // }

    return (
        <li>
            {clicked == false ?
            <div>
                <h3 onClick={changeClicked}>{item.food.label}</h3>
                <p>{item.food.brand}: {(item.food.nutrients.ENERC_KCAL).toFixed()} calories per {(item.measures[0].weight.toFixed())} grams</p>
            </div>
             : 
            <div>
                <h3 onClick={changeClicked}>{item.food.label}</h3>
                <div>
                    
                </div>
                <div>
                    <input type="number" defaultValue={item.measures[0].weight}></input> Grams
                    {/* <select onChange={changeDefaultServingSize}>
                        {mappedItemUnits}
                    </select> */}
                </div>
                
            </div>}
        </li>
    )
}

export default IndividualFood;