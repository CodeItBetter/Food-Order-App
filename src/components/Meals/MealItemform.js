import classes from './MealItemForm.module.css';
import Input from '../UI/Input';
import React,{ useState } from 'react';

const MealsItemForm  = ({meals}) =>{
  const [value, setValue] = useState(0);

  const changeHandler = (e) =>{
    setValue(e.target.value);
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    meals(value);
    
  }
    return(
      <form className={classes['form']} onSubmit={submitHandler}>
        <Input label="Amount" type="number" min="1" step="1" defaultValue="0"
        onChange={changeHandler} />
        <button>Add+</button>
      </form>
    )
}

export default MealsItemForm;