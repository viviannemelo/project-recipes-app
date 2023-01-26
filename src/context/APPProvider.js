import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from './ContextAPP';
import { firstLetterMealAPI, ingredientMealAPI, nameMealAPI } from '../service/MealAPI';
import { firstLetterDrinkAPI,
  ingredientDrinkAPI, nameDrinkAPI } from '../service/DrinkAPI';

export default function APPProvider({ children }) {
  const [radio, setRadio] = useState('ingredient');
  const [mealResults, setMealResults] = useState([]);
  const [drinkResults, setDrinkResults] = useState([]);

  const radioChange = ({ target: { value } }) => {
    setRadio(value);
  };

  const checkAndCallApi = async (page, type, input) => {
    if (page === 'meals') {
      if (type === 'ingredient') {
        const data = await ingredientMealAPI(input);
        setMealResults(data);
      }
      if (type === 'name') {
        const data = await nameMealAPI(input);
        setMealResults(data);
      }
      if (type === 'first-letter') {
        const data = await firstLetterMealAPI(input);
        setMealResults(data);
      }
    }
    if (page === 'drinks') {
      if (type === 'ingredient') {
        const data = await ingredientDrinkAPI(input);
        setDrinkResults(data);
      }
      if (type === 'name') {
        const data = await nameDrinkAPI(input);
        setDrinkResults(data);
      }
      if (type === 'first-letter') {
        const data = await firstLetterDrinkAPI(input);
        setDrinkResults(data);
      }
    }
  };

  const values = useMemo(() => ({
    radio,
    mealResults,
    drinkResults,
    radioChange,
    checkAndCallApi,
  }), [radio, mealResults, drinkResults]);
  return (
    <ContextAPP.Provider value={ values }>
      {children}
    </ContextAPP.Provider>

  );
}
APPProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
