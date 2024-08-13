import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const getRandomCocktails = () => {
  return axios.get(`${API_URL}/random.php`);
};

export const searchCocktails = (query) => {
  return axios.get(`${API_URL}/search.php?s=${query}`);
};

export const getAllCocktails = () => {
  return axios.get(`${API_URL}/filter.php?c=Cocktail`);
};

export const getCocktailById = (id) => {
  return axios.get(`${API_URL}/lookup.php?i=${id}`);
};