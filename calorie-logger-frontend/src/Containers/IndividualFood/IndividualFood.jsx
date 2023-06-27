import './IndividualFood.css';

const IndividualFood = (props) => {
    const {item} = props;

    return (
        <div>
            <p>{item.name}</p>
        </div>
    )
}

export default IndividualFood;