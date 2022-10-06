import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React,{ useContext, useState, Fragment } from 'react';
import {AuthContext} from '../store/AuthContext';
import CartItem from './CartItem';
import CheckOutForm from './CheckOutForm';

const Cart = () =>{
    const ctx = useContext(AuthContext);
    const [toggle, setToggle] = useState(true);
    const [submitted, setIsSubmitted] = useState(false);
    // const [toggle, setToggle] = useState(true);


    const orderHandler = () =>{
        setToggle(false);
    }

    const userDataHandler = async (userData) =>{
        
        await fetch('https://food-order-app-41b91-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                meals: ctx.cart,
                userData: userData
            })
        });
        ctx.reset();
        setIsSubmitted(true);
    }

    const orderInProgress = (
        <Fragment>
             {ctx.cart.map(cartItem => <CartItem key={cartItem.id} meals={cartItem} />)}
            <div className={classes['total']}>
                <h4>Total Amount</h4>
                <h4>{ctx.total.toFixed(2)}</h4>
            </div>
            {!toggle && <CheckOutForm onCancel={ctx.onClose} submitUserData={userDataHandler} /> }
            {toggle && <div className={classes['actions']}>
                <button className={classes['button--alt']} onClick={ctx.onClose}>Close</button>
                <button className={classes['button']} onClick={orderHandler}>Order</button>
            </div> }
        </Fragment>
    )
    return(
        <Modal>
        <div className={classes['cart-items']}>
            {!submitted && orderInProgress}
            {submitted && <p>Ordered successfully!!!</p>}
        </div>
        </Modal>
    )
}

export default Cart;
