import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailById } from '../api/cocktailApi';
import './CocktailDetailsPage.css';

const CocktailDetailsPage = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      const response = await getCocktailById(id);
      setCocktail(response.data.drinks[0]);
    };
    
    fetchCocktailDetails();
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cocktail-details">
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>Category: {cocktail.strCategory}</h3>
      <h3>Glass: {cocktail.strGlass}</h3>
      <h3>Instructions:</h3>
      <p>{cocktail.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 15 }).map((_, index) => {
          const ingredient = cocktail[`strIngredient${index + 1}`];
          const measure = cocktail[`strMeasure${index + 1}`];
          return ingredient ? (
            <li key={index}>
              {ingredient} - {measure}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default CocktailDetailsPage;