import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem("lastSearch") || "";
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("lastSearch", lastSearch);
  }, [lastSearch]);

  const addFavorite = (movieId) => {
    setFavorites((prev) => [...prev, movieId]);
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
