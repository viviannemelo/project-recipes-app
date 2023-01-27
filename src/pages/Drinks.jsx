import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import ContextAPP from '../context/ContextAPP';
import Footer from '../components/Footer';

function Drinks() {
  const { drinkResults } = useContext(ContextAPP);
  return (
    <div>
      { drinkResults.length === 1
        && <Redirect to={ `/drinks/${drinkResults[0].idDrink}` } /> }
      <Header name="Drinks" type="drinks" iconProfile iconSearch />
      <Recipes name="drink" />
      <Footer />
    </div>
  );
}

export default Drinks;
