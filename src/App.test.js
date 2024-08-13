import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('renders the navigation links', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if navigation links are rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument();
  });

  test('renders the home page with cocktail list', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if "Random Cocktails" header is rendered
    expect(screen.getByText(/Random Cocktails/i)).toBeInTheDocument();

    // Simulate fetching and displaying 5 cocktails
    const cocktailCards = await screen.findAllByRole('img');
    expect(cocktailCards.length).toBe(5);
  });

  test('navigates to search page', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Simulate click on the Search link
    fireEvent.click(screen.getByText(/Search/i));

    // Check if the search page is displayed
    expect(screen.getByText(/Search for a cocktail/i)).toBeInTheDocument();
  });

  test('adds and removes a favourite cocktail', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Add to favourites from home page
    const addButton = await screen.findByText(/Add to Favourites/i);
    fireEvent.click(addButton);

    // Navigate to Favourites page
    fireEvent.click(screen.getByText(/Favourites/i));

    // Check if the cocktail is added
    const favouriteCocktails = await screen.findAllByRole('img');
    expect(favouriteCocktails.length).toBe(1);

    // Remove from favourites
    const removeButton = screen.getByText(/Remove from Favourites/i);
    fireEvent.click(removeButton);

    // Check if the cocktail is removed
    expect(screen.queryByText(/Remove from Favourites/i)).toBeNull();
  });
});
