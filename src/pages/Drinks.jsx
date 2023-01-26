import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ContextAPP from '../context/ContextAPP';

function Drinks() {
  const { drinkResults } = useContext(ContextAPP);
  return (
    <div>
      { drinkResults.length === 1
        && <Redirect to={ `/drinks/${drinkResults[0].idDrink}` } /> }
      <Header name="drinks" iconProfile iconSearch />
    </div>
  );
}

export default Drinks;
