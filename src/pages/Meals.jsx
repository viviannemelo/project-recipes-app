import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ContextAPP from '../context/ContextAPP';

function Meals() {
  const { mealResults } = useContext(ContextAPP);
  return (
    <div>
      { mealResults.length === 1
        && <Redirect to={ `/meals/${mealResults[0].idMeal}` } /> }
      <Header name="meals" iconProfile iconSearch />
    </div>
  );
}

export default Meals;
