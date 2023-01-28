import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

const NUMBER_THIRTY_TWO = 32;

function Recipe(props) {
  const { data, fetchRecipe, ready, itsMeal } = useContext(ContextRecipe);
  useEffect(() => {
    const {
      match: {
        params: { id },
      }, name,
    } = props;
    const fetchResult = async () => {
      await fetchRecipe(name, id);
    };
    fetchResult();
  }, []);

  const urlToEmbedUrl = (url) => `https://www.youtube.com/embed/${url.slice(NUMBER_THIRTY_TWO)}`;

  const getIngredients = (propriedade) => Object.entries(data[0])
    .filter((str) => str[0].includes(propriedade))
    .filter((str) => str[1]);

  const ingredientAndMeasure = () => {
    const measure = getIngredients('strMeasure');
    const ingredient = getIngredients('strIngredient');

    return ingredient.map((i, index) => ({
      ingredient: i[1],
      measure: measure[index][1],
    }));
  };

  return (
    <div>
      { ready
        && (
          <div>
            <h1 data-testid="recipe-title">
              {data[0].strDrink || data[0].strMeal}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ data[0].strMealThumb || data[0].strDrinkThumb }
              alt={ data[0].strDrink || data[0].strMeal }
              height="150px"
            />
            <h3 data-testid="recipe-category">
              {itsMeal === true ? data[0].strCategory : data[0].strAlcoholic}
            </h3>
            <ul>
              {
                ingredientAndMeasure().map(({ ingredient, measure }, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${ingredient} ${measure}` }
                  </li>
                ))
              }
            </ul>
            <p data-testid="instructions">
              {data[0].strInstructions}
            </p>
          </div>
        )}
      { ready && itsMeal
        && (
          <div>
            <iframe
              width="420"
              height="315"
              src={ urlToEmbedUrl(data[0].strYoutube) }
              title="Embeded Video"
              data-testid="video"
            />
          </div>
        )}
    </div>
  );
}
Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Recipe;
