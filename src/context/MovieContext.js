// // import { createContext, useState, useEffect } from 'react';

// // export const MovieContext = createContext();

// // export function MovieProvider({ children }) {
// //   const [lastSearch, setLastSearch] = useState(() => {
// //     return localStorage.getItem('lastSearch') || '';
// //   });
// //   const [favorites, setFavorites] = useState(() => {
// //     try {
// //       return JSON.parse(localStorage.getItem('favorites')) || [];
// //     } catch {
// //       return [];
// //     }
// //   });

// //   useEffect(() => {
// //     localStorage.setItem('lastSearch', lastSearch);
// //   }, [lastSearch]);

// //   useEffect(() => {
// //     localStorage.setItem('favorites', JSON.stringify(favorites));
// //   }, [favorites]);

// //   const resetSearch = () => {
// //     setLastSearch('');
// //     localStorage.setItem('lastSearch', '');
// //   };

// //   const addFavorite = (movie) => {
// //     setFavorites((prev) => {
// //       if (prev.some((fav) => fav.id === movie.id)) {
// //         return prev; // Movie already favorited
// //       }
// //       return [...prev, movie];
// //     });
// //   };

// //   const removeFavorite = (movieId) => {
// //     setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
// //   };

// //   return (
// //     <MovieContext.Provider
// //       value={{
// //         lastSearch,
// //         setLastSearch,
// //         resetSearch,
// //         favorites,
// //         addFavorite,
// //         removeFavorite,
// //       }}
// //     >
// //       {children}
// //     </MovieContext.Provider>
// //   );
// // }

// import { createContext, useState, useEffect } from 'react';
// import { getGenres } from '../services/api';

// export const MovieContext = createContext();

// export function MovieProvider({ children }) {
//   const [lastSearch, setLastSearch] = useState(() => {
//     return localStorage.getItem('lastSearch') || '';
//   });
//   const [favorites, setFavorites] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem('favorites')) || [];
//     } catch {
//       return [];
//     }
//   });
//   const [genres, setGenres] = useState([]);
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem('user')) || null;
//     } catch {
//       return null;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem('lastSearch', lastSearch);
//   }, [lastSearch]);

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     localStorage.setItem('user', JSON.stringify(user));
//   }, [user]);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const data = await getGenres();
//         setGenres(data);
//       } catch (err) {
//         console.error('Failed to fetch genres:', err.message);
//       }
//     };
//     fetchGenres();
//   }, []);

//   const resetSearch = () => {
//     setLastSearch('');
//     localStorage.setItem('lastSearch', '');
//   };

//   const addFavorite = (movie) => {
//     setFavorites((prev) => {
//       if (prev.some((fav) => fav.id === movie.id)) {
//         return prev;
//       }
//       return [...prev, movie];
//     });
//   };

//   const removeFavorite = (movieId) => {
//     setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
//   };

//   const login = (username, password) => {
//     if (username && password) {
//       setUser({ username });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     setFavorites([]);
//     localStorage.removeItem('favorites');
//   };

//   return (
//     <MovieContext.Provider
//       value={{
//         lastSearch,
//         setLastSearch,
//         resetSearch,
//         favorites,
//         addFavorite,
//         removeFavorite,
//         genres,
//         user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </MovieContext.Provider>
//   );
// }

import { createContext, useState, useEffect } from 'react';
import { getGenres } from '../services/api';

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

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

  const resetSearch = () => {
    setLastSearch('');
    localStorage.setItem('lastSearch', '');
  };

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  };

  const login = (username, password) => {
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

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