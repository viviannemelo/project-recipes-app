import { firstLetterDrinkAPI, ingredientDrinkAPI,
  nameDrinkAPI } from '../service/DrinkAPI';

const message = 'Sorry, we haven\'t found any recipes for these filters.';

const helperAPIDrink = async (type, input) => {
  if (type === 'ingredient') {
    const data = await ingredientDrinkAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
  if (type === 'name') {
    const data = await nameDrinkAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
  if (type === 'first-letter') {
    const data = await firstLetterDrinkAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
};

export default helperAPIDrink;
