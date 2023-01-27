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
