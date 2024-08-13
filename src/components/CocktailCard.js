import React from 'react';
import './CocktailCard.css';

const CocktailCard = ({ cocktail, showAddButton, onAdd, onRemove }) => {
  return (
    <div className="cocktail-card">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
      <h2 className="cocktail-name">{cocktail.strDrink}</h2>
      <p className="cocktail-category">{cocktail.strCategory}</p>
      {showAddButton && <button className="add-button" onClick={() => onAdd(cocktail)}>Add</button>}
      {onRemove && <button className="remove-button" onClick={() => onRemove(cocktail.idDrink)}>Remove</button>}
    </div>
  );
};

export default CocktailCard;
