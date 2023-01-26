import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from './ContextAPP';
import helperAPIMeal from '../helpers/helperAPIMeal';
import helperAPIDrink from '../helpers/helperAPIDrink';

export default function APPProvider({ children }) {
  const [radio, setRadio] = useState('ingredient');
  const [mealResults, setMealResults] = useState([]);
  const [drinkResults, setDrinkResults] = useState([]);

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
