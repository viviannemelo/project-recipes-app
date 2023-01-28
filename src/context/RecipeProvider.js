import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';
import { getMealsDetails } from '../service/MealAPI';
import { getDrinkDetails } from '../service/DrinkAPI';

export default function RecipeProvider({ children }) {
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [itsMeal, setItsMeal] = useState(false);

  const fetchRecipe = async (type, id) => {
    if (type === 'meal') {
      const meals = await getMealsDetails(id);
      setData(meals);
      setReady(true);
      setItsMeal(true);
    }
    if (type === 'drink') {
      const drink = await getDrinkDetails(id);
      setData(drink);
      setReady(true);
      setItsMeal(false);
    }
  };
  const values = useMemo(() => ({
    data,
    ready,
    itsMeal,
    fetchRecipe,
  }), [data, ready, itsMeal]);
  return (
    <ContextRecipe.Provider value={ values }>
      {children}
    </ContextRecipe.Provider>
  );
}
RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
