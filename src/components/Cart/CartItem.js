import {Fragment, useContext} from 'react';
import classes from './CartItem.module.css';
import {AuthContext} from '../store/AuthContext';

const CartItem = ({meals}) =>{
    const {name, amount, id, count} = meals;
    const ctx = useContext(AuthContext);

    return(
        <Fragment>
        <div className={classes['meals']}>
            <div className={classes['meals-details']}>
                <h3>{name}</h3>
                <div className={classes['amount']}>
                    <span>{amount}</span>
                    <span><i className="fa fa-times" aria-hidden="true"></i> {count}</span>
                </div>
            </div>
            <div className={classes['quantity']}>
                <span className={classes['btn']} onClick={() => ctx.onDecrease(meals)}>-</span>
                <span className={classes['btn']} onClick={() => ctx.onAddItems({...meals, count:1})}>+</span>
            </div>
        </div><hr className={classes['hr']} />
        </Fragment>
)
}

export default CartItem;