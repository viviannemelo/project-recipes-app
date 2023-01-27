import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from '../context/ContextAPP';

function Recipes(props) {
  const { mealResults, drinkResults,
    mealCatResults, drinkCatResults } = useContext(ContextAPP);
  const [results, setResults] = useState([]);
  const [resultsCategories, setResultsCategories] = useState([]);

  console.log(resultsCategories);

  useEffect(() => {
    const { name } = props;
    if (name === 'meal') {
      setResults(mealResults);
      setResultsCategories(mealCatResults);
    }
    if (name === 'drink') {
      setResults(drinkResults);
      setResultsCategories(drinkCatResults);
    }
  }, [mealResults, drinkResults, mealCatResults, drinkCatResults]);

  return (
    <div className="Card">
      {
        resultsCategories.map((categories, index) => {
          if (index > Number('4')) {
            return;
          }
          return (
            <button
              key={ categories.strCategory }
              data-testid={ `${categories.strCategory}-category-filter` }
            >
              {categories.strCategory}
            </button>
          );
        })
      }
      {
        results.map((result, index) => {
          if (index > Number('11')) {
            return;
          }
          const item = result.strMeal || result.strDrink;
          const image = result.strMealThumb || result.strDrinkThumb;
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ image }
                  alt={ item }
                  height="70px"
                />
                <h6 data-testid={ `${index}-card-name` }>
                  { item }
                </h6>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Recipes;
