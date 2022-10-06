import React, { useEffect, useState } from 'react';
import classes from './MealsList.module.css';
import MealItem from './MealItem';
import Card from '../UI/Card';

const MealsList = () =>{
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealsHandler  = async () =>{
    try{
      const response = await fetch('https://food-order-app-41b91-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const loadedMeals = [];

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
    }catch(err){
      setError(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() =>{
    fetchMealsHandler();
  }, []);

  let content;

  if(isLoading){
    content = <p className={classes['loading']}>Loading....</p>
  }

  if(!isLoading && error){
    content = <p className={classes['error']}>{error}</p>
  }

  if(!isLoading && !error && meals.length > 0){
    content = ( <Card>
      <ul>{meals.map(meal => <MealItem key={meal.id} meal={meal} />)}</ul> </Card>)          
  }
    return(
        <div className={classes['meals']}>
         
              {content}
         
        </div>
    )
}

export default MealsList;
