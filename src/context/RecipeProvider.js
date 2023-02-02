import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';
import { getMealsDetails, initialMealAPI } from '../service/MealAPI';
import { getDrinkDetails, initialDrinkAPI } from '../service/DrinkAPI';

const ZERO = 0;
const TWO = 2;
const FOUR = 4;
const SIX = 6;

export default function RecipeProvider({ children }) {
  const [recomendations, setRecomendations] = useState([]);
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [itsMeal, setItsMeal] = useState(false);
  const [isButtonHidden, setButtonHidden] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const checkFavorite = (id) => {
    const getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getItem) {
      const takeItem = getItem.find((el) => (el.id === id));
      if (takeItem) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  };

  const dataConstruction = (objInfo) => {
    // const getType = Object.keys(data)[0].slice(2).toLowerCase();
    const date = new Date();
    const THREE = 3;

    const obj = {
      id: objInfo.idMeal || objInfo.idDrink,
      type: (Object.keys(objInfo)[1]).slice(THREE).toLowerCase(),
      nationality: objInfo.strArea || '',
      category: objInfo.strCategory || '',
      alcoholicOrNot: objInfo.strAlcoholic || '',
      name: objInfo.strDrink || objInfo.strMeal,
      image: objInfo.strMealThumb || objInfo.strDrinkThumb,
      doneDate: date,
      tags: objInfo.strTags ? objInfo.strTags.split(',') : [],
    };
    return obj;
  };

  const dataForFavorite = (objInfo) => {
    const THREE = 3;
    const obj = {
      id: objInfo.idMeal || objInfo.idDrink,
      type: (Object.keys(objInfo)[1]).slice(THREE).toLowerCase(),
      nationality: objInfo.strArea || '',
      category: objInfo.strCategory || '',
      alcoholicOrNot: objInfo.strAlcoholic || '',
      name: objInfo.strDrink || objInfo.strMeal,
      image: objInfo.strMealThumb || objInfo.strDrinkThumb,
    };
    return obj;
  };

  const favoriteRecipe = (id) => {
    const getItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getItem) {
      const takeItem = getItem.find((el) => (el.id === id));
      if (takeItem) {
        const removeFavorite = getItem.filter((el) => (el.id !== id));
        localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
        setIsFavorited(false);
      } else {
        const concatItem = getItem.concat(dataForFavorite(data[0]));
        localStorage.setItem('favoriteRecipes', JSON.stringify(concatItem));
        setIsFavorited(true);
      }
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([dataForFavorite(data[0])]));
      setIsFavorited(true);
    }
  };

  const localStorageSetUp = (id, getData) => {
    const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getItem) {
      const takeItem = getItem.find((el) => (el.id === id));
      if (takeItem) {
        setButtonHidden(true);
      } else {
        const concatItem = getItem.concat(getData);
        localStorage.setItem('doneRecipes', JSON.stringify(concatItem));
        setButtonHidden(false);
      }
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([getData]));
    }
  };

  const fetchRecipe = async (type, id) => {
    if (type === 'meals') {
      const meals = await getMealsDetails(id);
      const drink = await initialDrinkAPI();
      const drinkWithID = drink.map((receita, index) => {
        const obj = {
          ...receita,
          id: index,
        };
        return obj;
      });
      setData(meals);
      setReady(true);
      setItsMeal(true);
      setRecomendations([
        drinkWithID.slice(ZERO, TWO),
        drinkWithID.slice(TWO, FOUR),
        drinkWithID.slice(FOUR, SIX),
      ]);
      const quantitys = Object.entries(meals[0])
        .filter((str) => str[0].includes('strIngredient'))
        .filter((str) => str[1]).map((str) => str[1]);
      setQuantity(quantitys.length);
    }
    if (type === 'drinks') {
      const drinks = await getDrinkDetails(id);
      const meal = await initialMealAPI();
      const mealWithID = meal.map((receita, index) => {
        const obj = {
          ...receita,
          id: index,
        };
        return obj;
      });
      setData(drinks);
      setReady(true);
      setItsMeal(false);
      setRecomendations([
        mealWithID.slice(ZERO, TWO),
        mealWithID.slice(TWO, FOUR),
        mealWithID.slice(FOUR, SIX),
      ]);
      const quantitys = Object.entries(drinks[0])
        .filter((str) => str[0].includes('strIngredient'))
        .filter((str) => str[1]).map((str) => str[1]);
      setQuantity(quantitys.length);
    }
  };
  const values = useMemo(() => ({
    data,
    ready,
    itsMeal,
    recomendations,
    isFavorited,
    quantity,
    fetchRecipe,
    localStorageSetUp,
    isButtonHidden,
    dataConstruction,
    favoriteRecipe,
    checkFavorite,
  }), [data, ready, itsMeal, recomendations, isButtonHidden, isFavorited, quantity]);
  return (
    <ContextRecipe.Provider value={ values }>
      {children}
    </ContextRecipe.Provider>
  );
}
RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
