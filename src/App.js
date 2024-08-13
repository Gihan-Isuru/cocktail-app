import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavouritesPage from './pages/FavouritesPage';
import CocktailDetailsPage from './pages/CocktailDetailsPage';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
  const [favourites, setFavourites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (savedFavourites) {
      setFavourites(savedFavourites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavorites = (cocktail) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.some((fav) => fav.idDrink === cocktail.idDrink)) {
        return prevFavourites;
      }
      return [...prevFavourites, cocktail];
    });
  };

  const removeFromFavorites = (id) => {
    setFavourites(favourites.filter(cocktail => cocktail.idDrink !== id));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="app-wrapper">
<Router>
      <nav className="nav-bar">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/search" onClick={toggleMenu}>Search</Link>
          <Link to="/favourites" onClick={toggleMenu}>Favourites</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage addToFavorites={addToFavorites} />} />
        <Route path="/search" element={<SearchPage addToFavorites={addToFavorites} />} />
        <Route path="/favourites" element={<FavouritesPage favourites={favourites} removeFromFavorites={removeFromFavorites} />} />
        <Route path="/cocktail/:id" element={<CocktailDetailsPage />} />
      </Routes>
    </Router>
    </div>
    
  );
};

export default App;
