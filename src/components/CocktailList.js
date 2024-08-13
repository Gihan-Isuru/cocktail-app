import React from 'react';
import { Link } from 'react-router-dom';
import './CocktailList.css';

const CocktailList = ({ cocktails, showAddButton, onAdd }) => {
  return (
    <div className="cocktail-list">
      {cocktails.map(cocktail => (
        <div key={cocktail.idDrink} className="cocktail-card">
          <Link to={`/cocktail/${cocktail.idDrink}`}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            <p>{cocktail.strCategory}</p>
          </Link>
          {showAddButton && (
            <button onClick={() => onAdd(cocktail)}>Add to Favourites</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CocktailList;