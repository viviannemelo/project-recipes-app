import React from 'react';
import Done from '../components/Done';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header name="Done Recipes" iconProfile iconSearch={ false } />
      <Done />
    </div>
  );
}

export default DoneRecipes;
