import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from '../context/ContextAPP';

function Recipes(props) {
  const { mealResults, drinkResults } = useContext(ContextAPP);
  const [results, setResults] = useState([]);

  console.log(mealResults);

  useEffect(() => {
    const { name } = props;
    if (name === 'meal') {
      setResults(mealResults);
    }
    if (name === 'drink') {
      setResults(drinkResults);
    }
  }, [mealResults, drinkResults]);

  return (
    <div className="Card">
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
