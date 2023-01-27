import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import ContextAPP from '../context/ContextAPP';

function Meals() {
  const { mealResults } = useContext(ContextAPP);
  return (
    <div>
      { mealResults.length === 1
        && <Redirect to={ `/meals/${mealResults[0].idMeal}` } /> }
      <Header name="Meals" type="meals" iconProfile iconSearch />
      <Recipes name="meal" />
      <Footer />
    </div>
  );
}

export default Meals;
