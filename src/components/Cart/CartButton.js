import React,{useContext} from 'react';
import CartIcon from './CartIcon';
import classes from './CartButton.module.css';
import {AuthContext} from '../store/AuthContext';

const CartButton = ({onOpen}) =>{
    const ctx = useContext(AuthContext);
    return(
        <div className={classes['button']} onClick={ctx.onOpen}>
            <span className={classes['icon']}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes['badge']}>{ctx.cart.length}</span>
        </div>
    )
}

export default CartButton;