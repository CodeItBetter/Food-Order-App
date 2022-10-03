import classes from './MealItem.module.css';
import {useContext} from 'react';
import MealsItemForm from './MealItemform';
import {AuthContext} from '../store/AuthContext';

const MealItem = ({meal}) =>{
    const ctx = useContext(AuthContext);
    const {price, name, description, id} = meal;

    const amount = `${price.toFixed(2)}`;

    const mealsHandler = (count) =>{
        const meals = {
            name,
            description,
            amount: +amount,
            id,
            count: +count
        }
        ctx.onAddItems(meals);
    }
    return(
        <div className={classes['meal']}>
            <li>      
                <h3>{name}</h3>
                <div className={classes['description']}>
                    <p>{description}</p>
                </div>
                <div className={classes['price']}>
                    <p>${amount}</p>
                </div>
            </li>
            <MealsItemForm meals={mealsHandler} />
        </div>
    )
}

export default MealItem;