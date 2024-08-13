import React, { useState } from 'react';
import { searchCocktails } from '../api/cocktailApi';
import CocktailList from '../components/CocktailList';
import './SearchPage.css';

const SearchPage = ({ addToFavorites }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false); 

  const handleSearch = async () => {
    const response = await searchCocktails(query);
    const drinks = response.data.drinks || [];
    setResults(drinks);
    setNoResults(drinks.length === 0); 
  };

  return (
    <div className="search-page">
      <h1>Search Cocktails</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a cocktail..."
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      
      {noResults && (
        <p className="no-results-message">No cocktails found for "{query}". Please try another search.</p>
      )}
      
      <CocktailList cocktails={results} showAddButton={true} onAdd={addToFavorites} />
    </div>
  );
};

export default SearchPage;
