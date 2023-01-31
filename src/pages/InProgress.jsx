import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function InProgress() {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];
  const { data, checkFavorite, ready, itsMeal,
    isFavorited, favoriteRecipe, fetchRecipe } = useContext(ContextRecipe);

  useEffect(() => {
    const fetchResult = async () => {
      await fetchRecipe(type, id);
    };
    fetchResult();
    checkFavorite(id);
  }, []);

  const handleCopy = () => {
    copy(`http://localhost:3000/${type}/${id}`);

    setCopied(true);
  };

  const handleFavorited = () => {
    favoriteRecipe(id);
  };

  return (
    <div>
      <h1>Em Progresso</h1>
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
      <div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default InProgress;
