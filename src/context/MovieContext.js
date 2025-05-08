import { createContext, useState, useEffect } from 'react';
import { getGenres } from '../services/api';

// Create a context to hold movie-related global state
export const MovieContext = createContext();

// MovieProvider component wraps children with MovieContext.Provider
export function MovieProvider({ children }) {
  // Load last search term from localStorage or default to empty string
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });

  // Load favorite movies from localStorage or default to empty array
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });

  // Genres fetched from API
  const [genres, setGenres] = useState([]);

  // Load user info from localStorage or set to null
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  // Load theme mode (light or dark) from localStorage or default to 'light'
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'light';
    } catch {
      return 'light';
    }
  });

  // Store the current search query in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist user data in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Persist theme mode in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Fetch genres from API on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error('Failed to fetch genres:', err.message);
      }
    };
    fetchGenres();
  }, []);

  // Clears the search term in both state and localStorage
  const resetSearch = () => {
    setLastSearch('');
    localStorage.setItem('lastSearch', '');
  };

  // Adds a movie to favorites if it's not already there
  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev; // Avoid duplicates
      }
      return [...prev, movie];
    });
  };

  // Removes a movie from favorites by ID
  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  };

  // Dummy login function that accepts any non-empty username/password
  const login = (username, password) => {
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  // Logs the user out and clears favorites from state and localStorage
  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  // Toggles theme mode between 'light' and 'dark'
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Provide context values to all children components
  return (
    <MovieContext.Provider
      value={{
        lastSearch,
        setLastSearch,
        resetSearch,
        favorites,
        addFavorite,
        removeFavorite,
        genres,
        user,
        login,
        logout,
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
