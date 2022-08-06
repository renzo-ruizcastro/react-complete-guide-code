import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const applyData = data => {
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          description: data[key].description,
          name: data[key].name,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    sendRequest(
      'https://react-http-95fe3-default-rtdb.firebaseio.com/meals.json',
      applyData
    );
  }, [sendRequest]);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p>Loading...</p>;
  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }
  if (error) {
    content = <p>Error: {error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
