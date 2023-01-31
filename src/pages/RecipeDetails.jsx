import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const NUMBER_THIRTY_TWO = 32;
const CONTINUE_RECIPE = 'Continue Recipe';

function Recipe(props) {
  const location = useLocation();
  const {
    match: {
      params: { id },
    }, name, history,
  } = props;

  const { data, checkFavorite, isFavorited,
    fetchRecipe, ready, itsMeal, recomendations,
    localStorageSetUp, isButtonHidden, dataConstruction,
    favoriteRecipe } = useContext(ContextRecipe);
  const [BtnContinue, setContinue] = useState(CONTINUE_RECIPE);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (ready) {
      localStorageSetUp(id, dataConstruction(data[0]));
    }
  }, [data, isButtonHidden]);
  useEffect(() => {
    const fetchResult = async () => {
      await fetchRecipe(name, id);
    };
    fetchResult();
    checkFavorite(id);
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
      measure: measure[index] ? measure[index][1] : '',
    }));
  };
  const startRecipe = () => {
    const S = 's';
    const changeName = name + S;
    const ingredient = getIngredients('strIngredient');
    const obj = {
      drinks: {},
      meals: {},
    };
    obj[changeName] = {
      [id]: Object.keys(ingredient).map((el, i) => (
        i
      )),

    };
    Object.keys(ingredient).map((el, i) => (
      i
    ));
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getItem) {
      const obj2 = getItem;

      obj2[changeName][id] = Object.keys(ingredient).map((el, i) => (
        i
      ));
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj2));
      setContinue(CONTINUE_RECIPE);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      setContinue(CONTINUE_RECIPE);
    }
    history.push(`/${name}/${id}/in-progress`);
  };

  const handleCopy = () => {
    copy(`http://localhost:3000${location.pathname}`);

    setCopied(true);
  };

  const handleFavorited = () => {
    favoriteRecipe(id);
  };

  console.log(data);

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
      <div className="share-favorite">
        <button data-testid="share-btn" onClick={ handleCopy }>
          <img src={ shareIcon } alt="Share" />
        </button>
        { copied && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          onClick={ handleFavorited }
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFavorited ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
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
      <Carousel>
        { recomendations.map((recomendation, index) => {
          if (index > Number('3')) {
            return;
          }
          return (
            <Carousel.Item key={ `recipe ${index}` }>
              {recomendation.map((recipe) => {
                const item = recipe.strMeal || recipe.strDrink;
                const image = recipe.strMealThumb || recipe.strDrinkThumb;
                const { id: identidade } = recipe;
                return (
                  <div
                    key={ identidade }
                    data-testid={ `${identidade}-recommendation-card` }
                  >
                    <img src={ image } alt="Imagem" height="120px" />
                    <p data-testid={ `${identidade}-recommendation-title` }>{item}</p>
                  </div>
                );
              })}
            </Carousel.Item>
          );
        })}
      </Carousel>
      {
        !isButtonHidden
       && (
         <button
           className="start"
           type="button"
           data-testid="start-recipe-btn"
           onClick={ startRecipe }
           value="Start Recipe"
         >
           {BtnContinue}
         </button>
       )
      }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Recipe;
