import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from './ContextAPP';
import helperAPIMeal from '../helpers/helperAPIMeal';
import helperAPIDrink from '../helpers/helperAPIDrink';
import { categoryMealAPI, initialMealAPI } from '../service/MealAPI';
import { categoryDrinkAPI, initialDrinkAPI } from '../service/DrinkAPI';

export default function APPProvider({ children }) {
  const [radio, setRadio] = useState('ingredient');
  const [mealResults, setMealResults] = useState([]);
  const [drinkResults, setDrinkResults] = useState([]);
  const [mealCatResults, setCategoryMealResults] = useState([]);
  const [drinkCatResults, setCategoryDrinkResults] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const meal = await initialMealAPI();
      const drink = await initialDrinkAPI();
      const mealCategories = await categoryMealAPI();
      const drinkCategories = await categoryDrinkAPI();
      setMealResults(meal);
      setDrinkResults(drink);
      setCategoryMealResults(mealCategories);
      setCategoryDrinkResults(drinkCategories);
    };

    fetchApi();
  }, []);

  const radioChange = ({ target: { value } }) => {
    setRadio(value);
  };

  const checkAndCallApi = async (page, type, input) => {
    if (page === 'meals') {
      const resultado = await helperAPIMeal(type, input);
      setMealResults(resultado);
    }
    if (page === 'drinks') {
      const resultado = await helperAPIDrink(type, input);
      setDrinkResults(resultado);
    }
  };

  const values = useMemo(() => ({
    radio,
    mealResults,
    drinkResults,
    radioChange,
    checkAndCallApi,
    mealCatResults,
    drinkCatResults,
  }), [radio, mealResults, drinkResults, mealCatResults, drinkCatResults]);
  return (
    <ContextAPP.Provider value={ values }>
      {children}
    </ContextAPP.Provider>

  );
}
APPProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
