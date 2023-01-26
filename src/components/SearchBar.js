import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPP from '../context/ContextAPP';

function SearchBar(props) {
  const [text, setText] = useState('');
  const { radio, radioChange, checkAndCallApi,
    mealResults, drinkResults } = useContext(ContextAPP);

  const handleSearch = async () => {
    const { name } = props;
    if (text.length > 1 && radio === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      await checkAndCallApi(name, radio, text);
      if (mealResults.length === 0 || drinkResults.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ text }
        onChange={ ({ target: { value } }) => setText(value) }
      />
      <label htmlFor="ingredient">
        Ingredient:
        <input
          name="ingredient"
          type="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ radio === 'ingredient' }
          onChange={ radioChange }
        />
      </label>
      <label htmlFor="name">
        Name:
        <input
          name="name"
          type="radio"
          value="name"
          data-testid="name-search-radio"
          checked={ radio === 'name' }
          onChange={ radioChange }
        />
      </label>
      <label htmlFor="first-letter">
        First Letter:
        <input
          type="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ radio === 'first-letter' }
          onChange={ radioChange }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchBar;
