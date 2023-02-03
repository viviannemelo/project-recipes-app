import React from 'react';
import Header from '../components/Header';
import Favorites from '../components/Favorites';

function FavoriteRecipes() {
  return (
    <div>
      <Header name="Favorite Recipes" iconProfile iconSearch={ false } />
      <Favorites />
    </div>
  );
}

export default FavoriteRecipes;
