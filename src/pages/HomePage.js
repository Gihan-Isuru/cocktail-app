import React, { useEffect, useState } from 'react';
import { getRandomCocktails, getAllCocktails } from '../api/cocktailApi';
import CocktailList from '../components/CocktailList';
import './HomePage.css';

const HomePage = ({ addToFavorites }) => {
  const [cocktails, setCocktails] = useState([]);
  const [allCocktails, setAllCocktails] = useState([]);
  const [visibleCocktails, setVisibleCocktails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const BATCH_SIZE = 10;

  const fetchRandomCocktails = async () => {
    const cocktailPromises = Array.from({ length: 5 }, () => getRandomCocktails());
    const results = await Promise.all(cocktailPromises);
    const cocktails = results.map(result => result.data.drinks[0]);
    setCocktails(cocktails);
  };

  const fetchAllCocktails = async () => {
    const response = await getAllCocktails();
    setAllCocktails(response.data.drinks);
    setVisibleCocktails(response.data.drinks.slice(0, BATCH_SIZE));
    setCurrentIndex(BATCH_SIZE);
  };

  const loadMoreCocktails = () => {
    const nextIndex = currentIndex + BATCH_SIZE;
    setVisibleCocktails(allCocktails.slice(0, nextIndex));
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    fetchRandomCocktails();
    fetchAllCocktails();
  }, []);

  return (
    <div className="home-page">
      <h1>Random Cocktails</h1>
      <CocktailList cocktails={cocktails} showAddButton={true} onAdd={addToFavorites} />
      <button className="refresh-button" onClick={fetchRandomCocktails}>Refresh</button>

      <h1>All Cocktails</h1>
      <CocktailList cocktails={visibleCocktails} showAddButton={true} onAdd={addToFavorites} />

      {currentIndex < allCocktails.length && (
        <div>
          <button className="load-more-button" onClick={loadMoreCocktails}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
