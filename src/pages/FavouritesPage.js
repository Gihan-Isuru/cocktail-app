import React from 'react';
import './FavouritesPage.css';

const FavouritesPage = ({ favourites, removeFromFavorites }) => {
  return (
    <div className="favourites-page">
      <h1>Your Favourite Cocktails</h1>
      <div className="favourites-list">
        {favourites.map(cocktail => (
          <div key={cocktail.idDrink} className="favourite-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            <button
              className="btn-remove"
              onClick={() => removeFromFavorites(cocktail.idDrink)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;