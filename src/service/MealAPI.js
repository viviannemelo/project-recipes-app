export const initialMealAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.meals;
};

export const ingredientMealAPI = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.meals;
};

export const nameMealAPI = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.meals;
};

export const firstLetterMealAPI = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.meals;
};

export const categoryMealAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  if (data.meals === null) {
    return [];
  }
  return data.meals;
};
