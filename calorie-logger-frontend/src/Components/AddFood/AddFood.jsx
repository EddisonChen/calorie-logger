import './AddFood.css';
import { Link } from 'react-router-dom';

const AddFood = () => {

    return (
        <div>
            <Link to="/FindFood"><button>
                Add Food +
            </button></Link>
            
        </div>
    )
}

export default AddFood;