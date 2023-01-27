import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMealsDetails } from '../service/MealAPI';
import { getDrinkDetails } from '../service/DrinkAPI';

function Recipe(props) {
  useEffect(() => {
    const {
      match: {
        params: { id },
      }, name,
    } = props;
    console.log('atualizando ');
    if (name === 'meal') {
      const fetchMeals = async () => {
        const meals = await getMealsDetails(id);
        console.log(meals);
      };
      fetchMeals();
    }
    if (name === 'drink') {
      const fetchDrinks = async () => {
        const data = await getDrinkDetails(id);
        return data;
      };
      fetchDrinks();
    }
  }, []);
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Recipe;
