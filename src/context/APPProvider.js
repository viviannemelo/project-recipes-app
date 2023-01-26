import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from './ContextAPP';
import { firstLetterMealAPI, ingredientMealAPI, nameMealAPI } from '../service/MealAPI';
import { firstLetterDrinkAPI,
  ingredientDrinkAPI, nameDrinkAPI } from '../service/DrinkAPI';

export default function APPProvider({ children }) {
  const [radio, setRadio] = useState('ingredient');
  const [results, setResults] = useState({});

  const radioChange = ({ target: { value } }) => {
    setRadio(value);
  };

  const checkAndCallApi = async (page, type, input) => {
    if (page === 'Meals') {
      if (type === 'ingredient') {
        const data = await ingredientMealAPI(input);
        setResults(data);
      }
      if (type === 'name') {
        const data = await nameMealAPI(input);
        setResults(data);
      }
      if (type === 'first-letter') {
        const data = await firstLetterMealAPI(input);
        setResults(data);
      }
    }
    if (page === 'Drinks') {
      if (type === 'ingredient') {
        const data = await ingredientDrinkAPI(input);
        setResults(data);
      }
      if (type === 'name') {
        const data = await nameDrinkAPI(input);
        setResults(data);
      }
      if (type === 'first-letter') {
        const data = await firstLetterDrinkAPI(input);
        setResults(data);
      }
    }
  };

  const values = useMemo(() => ({
    radio,
    results,
    radioChange,
    checkAndCallApi,
  }), [radio, results]);
  return (
    <ContextAPP.Provider value={ values }>
      {children}
    </ContextAPP.Provider>

  );
}
APPProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
