import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';
import { getMealsDetails, initialMealAPI } from '../service/MealAPI';
import { getDrinkDetails, initialDrinkAPI } from '../service/DrinkAPI';

const ZERO = 0;
const TWO = 2;
const FOUR = 4;
const SIX = 6;

export default function RecipeProvider({ children }) {
  const [recomendations, setRecomendations] = useState([]);
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [itsMeal, setItsMeal] = useState(false);

  const fetchRecipe = async (type, id) => {
    if (type === 'meal') {
      const meals = await getMealsDetails(id);
      const drink = await initialDrinkAPI();
      const drinkWithID = drink.map((receita, index) => {
        const obj = {
          ...receita,
          id: index,
        };
        return obj;
      });
      setData(meals);
      setReady(true);
      setItsMeal(true);
      setRecomendations([
        drinkWithID.slice(ZERO, TWO),
        drinkWithID.slice(TWO, FOUR),
        drinkWithID.slice(FOUR, SIX),
      ]);
    }
    if (type === 'drink') {
      const drinks = await getDrinkDetails(id);
      const meal = await initialMealAPI();
      const mealWithID = meal.map((receita, index) => {
        const obj = {
          ...receita,
          id: index,
        };
        return obj;
      });
      setData(drinks);
      setReady(true);
      setItsMeal(false);
      setRecomendations([
        mealWithID.slice(ZERO, TWO),
        mealWithID.slice(TWO, FOUR),
        mealWithID.slice(FOUR, SIX),
      ]);
    }
  };
  const values = useMemo(() => ({
    data,
    ready,
    itsMeal,
    recomendations,
    fetchRecipe,
  }), [data, ready, itsMeal, recomendations]);
  return (
    <ContextRecipe.Provider value={ values }>
      {children}
    </ContextRecipe.Provider>
  );
}
RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
