import { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });
  const [lastSearch, setLastSearch] = useState(() => {
    try {
      return localStorage.getItem('lastSearch') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('lastSearch', lastSearch);
    } catch (err) {
      console.error('Failed to save lastSearch to localStorage:', err);
    }
  }, [lastSearch]);

  const addFavorite = (movieId) => {
    if (!favorites.includes(movieId)) {
      setFavorites((prev) => [...prev, movieId]);
    }
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        lastSearch,
        setLastSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}