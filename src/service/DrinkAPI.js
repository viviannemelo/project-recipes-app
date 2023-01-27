export const initialDrinkAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  if (data.drinks === null) {
    return [];
  }
  return data.drinks;
};

export const ingredientDrinkAPI = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  if (data.drinks === null) {
    return [];
  }
  return data.drinks;
};

export const nameDrinkAPI = async (nome) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  if (data.drinks === null) {
    return [];
  }
  return data.drinks;
};

export const firstLetterDrinkAPI = async (primeiraLetra) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  if (data.drinks === null) {
    return [];
  }
  return data.drinks;
};
export const categoryDrinkAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.drinks;
};
export const filterDrinkAPI = async (drinkFilter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkFilter}`);
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.drinks;
};
export const getDrinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.drinks;
};
