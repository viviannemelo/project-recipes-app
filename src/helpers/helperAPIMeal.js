import { firstLetterMealAPI, ingredientMealAPI, nameMealAPI } from '../service/MealAPI';

const message = 'Sorry, we haven\'t found any recipes for these filters.';

const helperAPIMeal = async (type, input) => {
  if (type === 'ingredient') {
    const data = await ingredientMealAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
  if (type === 'name') {
    const data = await nameMealAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
  if (type === 'first-letter') {
    const data = await firstLetterMealAPI(input);
    if (data.length === 0) {
      global.alert(message);
    }
    return data;
  }
};

export default helperAPIMeal;
