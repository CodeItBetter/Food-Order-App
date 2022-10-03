import React,{Fragment} from "react";
import classes from './Header.module.css';
import mealsImg from "../../assests/meals.jpg"; 
import CartButton from '../Cart/CartButton';


const Header = () =>{   
    return(
        <Fragment>
            <header className={classes['header']}>
                <h1>ReactMeals</h1>
                <CartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="meals-img" />
            </div>
        </Fragment>
    )
}

export default Header;