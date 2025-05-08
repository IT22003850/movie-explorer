// // // import { useState, useEffect, useCallback, useContext } from 'react';
// // // import { Container, Typography, Grid, Alert } from '@mui/material';
// // // import InfiniteScroll from 'react-infinite-scroll-component';
// // // import { getTrendingMovies, searchMovies } from '../services/api';
// // // import SearchBar from '../components/SearchBar';
// // // import MovieCard from '../components/MovieCard';
// // // import { MovieContext } from '../context/MovieContext';

// // // function Home() {
// // //   const { resetSearch } = useContext(MovieContext);
// // //   const [movies, setMovies] = useState([]);
// // //   const [page, setPage] = useState(1);
// // //   const [hasMore, setHasMore] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [isSearching, setIsSearching] = useState(false);
// // //   const [currentQuery, setCurrentQuery] = useState('');
// // //   const [currentGenre, setCurrentGenre] = useState('');

// // //   const fetchTrending = async () => {
// // //     try {
// // //       console.log(`Fetching trending movies, page: ${page}`);
// // //       const data = await getTrendingMovies(page);
// // //       setMovies((prev) => {
// // //         const newMovies = data.results
// // //           .filter((movie) => movie?.id && movie?.title)
// // //           .filter((newMovie) => !prev.some((m) => m.id === newMovie.id));
// // //         return [...prev, ...newMovies];
// // //       });
// // //       setHasMore(data.page < data.total_pages);
// // //     } catch (err) {
// // //       setError('Unable to load trending movies. Please try again later.');
// // //     }
// // //   };

// // //   const handleSearch = useCallback(async (query, genreId) => {
// // //     console.log(`Searching for: ${query}, genre: ${genreId}`);
// // //     if (!query && !genreId) {
// // //       setIsSearching(false);
// // //       setMovies([]);
// // //       setPage(1);
// // //       setCurrentQuery('');
// // //       setCurrentGenre('');
// // //       return;
// // //     }
// // //     setIsSearching(true);
// // //     setMovies([]);
// // //     setPage(1);
// // //     setCurrentQuery(query);
// // //     setCurrentGenre(genreId);
// // //     try {
// // //       const data = await searchMovies(query, 1);
// // //       let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
// // //       if (genreId) {
// // //         filteredMovies = filteredMovies.filter((movie) =>
// // //           Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(genreId))
// // //         );
// // //       }
// // //       setMovies(filteredMovies);
// // //       setHasMore(data.page < data.total_pages);
// // //       if (filteredMovies.length === 0) {
// // //         setError('No movies found for this search.');
// // //       } else {
// // //         setError('');
// // //       }
// // //     } catch (err) {
// // //       setError('Search failed. Please check your connection or try again.');
// // //     }
// // //   }, []);

// // //   const loadMore = async () => {
// // //     if (isSearching && (currentQuery || currentGenre)) {
// // //       console.log(`Loading more search results, page: ${page + 1}`);
// // //       try {
// // //         const data = await searchMovies(currentQuery, page + 1);
// // //         let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
// // //         if (currentGenre) {
// // //           filteredMovies = filteredMovies.filter((movie) =>
// // //             Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(currentGenre))
// // //           );
// // //         }
// // //         setMovies((prev) => {
// // //           const newMovies = filteredMovies.filter(
// // //             (newMovie) => !prev.some((m) => m.id === newMovie.id)
// // //           );
// // //           return [...prev, ...newMovies];
// // //         });
// // //         setHasMore(data.page < data.total_pages);
// // //       } catch (err) {
// // //         setError('Failed to load more movies.');
// // //       }
// // //     } else {
// // //       console.log(`Loading more trending movies, page: ${page + 1}`);
// // //       await fetchTrending();
// // //     }
// // //     setPage((prev) => prev + 1);
// // //   };

// // //   useEffect(() => {
// // //     resetSearch();
// // //     setIsSearching(false);
// // //     setMovies([]);
// // //     setPage(1);
// // //     setCurrentQuery('');
// // //     setCurrentGenre('');
// // //     fetchTrending();
// // //   }, [resetSearch]);

// // //   return (
// // //     <Container sx={{ py: 4 }}>
// // //       <Typography variant="h4" gutterBottom>
// // //         {isSearching ? 'Search Results' : 'Trending Movies'}
// // //       </Typography>
// // //       <SearchBar onSearch={handleSearch} />
// // //       {error && (
// // //         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
// // //           {error}
// // //         </Alert>
// // //       )}
// // //       {movies.length === 0 && !error && !isSearching && (
// // //         <Typography>Loading movies...</Typography>
// // //       )}
// // //       <InfiniteScroll
// // //         dataLength={movies.length}
// // //         next={loadMore}
// // //         hasMore={hasMore}
// // //         loader={<Typography>Loading...</Typography>}
// // //         endMessage={<Typography>No more movies to load.</Typography>}
// // //       >
// // //         <Grid container spacing={2}>
// // //           {movies.map((movie) => (
// // //             <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
// // //               <MovieCard movie={movie} />
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       </InfiniteScroll>
// // //     </Container>
// // //   );
// // // }

// // // export default Home;
// // import { useState, useEffect, useCallback, useContext } from 'react';
// // import { Container, Typography, Grid, Alert, Button, Box } from '@mui/material';
// // import { getTrendingMovies, searchMovies } from '../services/api';
// // import SearchBar from '../components/SearchBar';
// // import MovieCard from '../components/MovieCard';
// // import { MovieContext } from '../context/MovieContext';

// // function Home() {
// //   const { resetSearch } = useContext(MovieContext);
// //   const [movies, setMovies] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [error, setError] = useState('');
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [currentQuery, setCurrentQuery] = useState('');
// //   const [currentGenre, setCurrentGenre] = useState('');
// //   const [currentYear, setCurrentYear] = useState('');
// //   const [currentRating, setCurrentRating] = useState('');

// //   const fetchTrending = async () => {
// //     try {
// //       console.log(`Fetching trending movies, page: ${page}`);
// //       const data = await getTrendingMovies(page);
// //       setMovies((prev) => {
// //         const newMovies = data.results
// //           .filter((movie) => movie?.id && movie?.title)
// //           .filter((newMovie) => !prev.some((m) => m.id === newMovie.id));
// //         return [...prev, ...newMovies];
// //       });
// //       setHasMore(data.page < data.total_pages);
// //     } catch (err) {
// //       setError('Unable to load trending movies. Please try again later.');
// //     }
// //   };

// //   const handleSearch = useCallback(async (query, genreId, year, rating) => {
// //     console.log(`Searching for: ${query}, genre: ${genreId}, year: ${year}, rating: ${rating}`);
// //     if (!query && !genreId && !year && !rating) {
// //       setIsSearching(false);
// //       setMovies([]);
// //       setPage(1);
// //       setCurrentQuery('');
// //       setCurrentGenre('');
// //       setCurrentYear('');
// //       setCurrentRating('');
// //       return;
// //     }
// //     setIsSearching(true);
// //     setMovies([]);
// //     setPage(1);
// //     setCurrentQuery(query);
// //     setCurrentGenre(genreId);
// //     setCurrentYear(year);
// //     setCurrentRating(rating);
// //     try {
// //       const data = await searchMovies(query, 1);
// //       let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
// //       if (genreId) {
// //         filteredMovies = filteredMovies.filter((movie) =>
// //           Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(genreId))
// //         );
// //       }
// //       if (year) {
// //         filteredMovies = filteredMovies.filter((movie) =>
// //           movie.release_date && movie.release_date.startsWith(year)
// //         );
// //       }
// //       if (rating) {
// //         filteredMovies = filteredMovies.filter((movie) =>
// //           movie.vote_average && movie.vote_average >= Number(rating)
// //         );
// //       }
// //       setMovies(filteredMovies);
// //       setHasMore(data.page < data.total_pages);
// //       if (filteredMovies.length === 0) {
// //         setError('No movies found for this search.');
// //       } else {
// //         setError('');
// //       }
// //     } catch (err) {
// //       setError('Search failed. Please check your connection or try again.');
// //     }
// //   }, []);

// //   const loadMore = async () => {
// //     if (isSearching && (currentQuery || currentGenre || currentYear || currentRating)) {
// //       console.log(`Loading more search results, page: ${page + 1}`);
// //       try {
// //         const data = await searchMovies(currentQuery, page + 1);
// //         let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
// //         if (currentGenre) {
// //           filteredMovies = filteredMovies.filter((movie) =>
// //             Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(currentGenre))
// //           );
// //         }
// //         if (currentYear) {
// //           filteredMovies = filteredMovies.filter((movie) =>
// //             movie.release_date && movie.release_date.startsWith(currentYear)
// //           );
// //         }
// //         if (currentRating) {
// //           filteredMovies = filteredMovies.filter((movie) =>
// //             movie.vote_average && movie.vote_average >= Number(currentRating)
// //           );
// //         }
// //         setMovies((prev) => {
// //           const newMovies = filteredMovies.filter(
// //             (newMovie) => !prev.some((m) => m.id === newMovie.id)
// //           );
// //           return [...prev, ...newMovies];
// //         });
// //         setHasMore(data.page < data.total_pages);
// //       } catch (err) {
// //         setError('Failed to load more movies.');
// //       }
// //     } else {
// //       console.log(`Loading more trending movies, page: ${page + 1}`);
// //       await fetchTrending();
// //     }
// //     setPage((prev) => prev + 1);
// //   };

// //   useEffect(() => {
// //     resetSearch();
// //     setIsSearching(false);
// //     setMovies([]);
// //     setPage(1);
// //     setCurrentQuery('');
// //     setCurrentGenre('');
// //     setCurrentYear('');
// //     setCurrentRating('');
// //     fetchTrending();
// //   }, [resetSearch]);

// //   return (
// //     <Container sx={{ py: 4 }}>
// //       <Typography variant="h4" gutterBottom>
// //         {isSearching ? 'Search Results' : 'Trending Movies'}
// //       </Typography>
// //       <SearchBar onSearch={handleSearch} />
// //       {error && (
// //         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
// //           {error}
// //         </Alert>
// //       )}
// //       {movies.length === 0 && !error && !isSearching && (
// //         <Typography>Loading movies...</Typography>
// //       )}
// //       <Grid container spacing={2}>
// //         {movies.map((movie) => (
// //           <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
// //             <MovieCard movie={movie} />
// //           </Grid>
// //         ))}
// //       </Grid>
// //       {hasMore && (
// //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// //           <Button variant="contained" onClick={loadMore}>
// //             Load More
// //           </Button>
// //         </Box>
// //       )}
// //       {!hasMore && movies.length > 0 && (
// //         <Typography sx={{ textAlign: 'center', mt: 4 }}>
// //           No more movies to load.
// //         </Typography>
// //       )}
// //     </Container>
// //   );
// // }

// // export default Home;

// import { useState, useEffect, useCallback, useContext } from 'react';
// import { Container, Typography, Grid, Alert, Button,Box } from '@mui/material';
// import { getTrendingMovies, searchMovies } from '../services/api';
// import SearchBar from '../components/SearchBar';
// import MovieCard from '../components/MovieCard';
// import { MovieContext } from '../context/MovieContext';

// function Home() {
//   const { resetSearch } = useContext(MovieContext);
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [currentQuery, setCurrentQuery] = useState('');
//   const [currentGenre, setCurrentGenre] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
//   const [currentRating, setCurrentRating] = useState('');

//   const fetchTrending = async () => {
//     try {
//       console.log(`Fetching trending movies, page: ${page}`);
//       const data = await getTrendingMovies(page);
//       setMovies((prev) => {
//         const newMovies = data.results
//           .filter((movie) => movie?.id && movie?.title)
//           .filter((newMovie) => !prev.some((m) => m.id === newMovie.id));
//         return [...prev, ...newMovies];
//       });
//       setHasMore(data.page < data.total_pages);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching trending movies:', err.message);
//       setError('Unable to load trending movies. Please try again later.');
//     }
//   };

//   const handleSearch = useCallback(async (query, genreId, year, rating) => {
//     console.log(`Searching for: ${query}, genre: ${genreId}, year: ${year}, rating: ${rating}`);
//     if (!query && !genreId && !year && !rating) {
//       setIsSearching(false);
//       setMovies([]);
//       setPage(1);
//       setCurrentQuery('');
//       setCurrentGenre('');
//       setCurrentYear('');
//       setCurrentRating('');
//       await fetchTrending();
//       return;
//     }
//     setIsSearching(true);
//     setMovies([]);
//     setPage(1);
//     setCurrentQuery(query);
//     setCurrentGenre(genreId);
//     setCurrentYear(year);
//     setCurrentRating(rating);
//     try {
//       const data = await searchMovies(query, 1);
//       let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
//       if (genreId) {
//         filteredMovies = filteredMovies.filter((movie) =>
//           Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(genreId))
//         );
//       }
//       if (year) {
//         filteredMovies = filteredMovies.filter((movie) =>
//           movie.release_date && movie.release_date.startsWith(year)
//         );
//       }
//       if (rating) {
//         filteredMovies = filteredMovies.filter((movie) =>
//           movie.vote_average && movie.vote_average >= Number(rating)
//         );
//       }
//       setMovies(filteredMovies);
//       setHasMore(data.page < data.total_pages);
//       if (filteredMovies.length === 0) {
//         setError('No movies found for this search.');
//       } else {
//         setError('');
//       }
//     } catch (err) {
//       setError('Search failed. Please check your connection or try again.');
//     }
//   }, []);

//   const loadMore = async () => {
//     if (isSearching && (currentQuery || currentGenre || currentYear || currentRating)) {
//       console.log(`Loading more search results, page: ${page + 1}`);
//       try {
//         const data = await searchMovies(currentQuery, page + 1);
//         let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
//         if (currentGenre) {
//           filteredMovies = filteredMovies.filter((movie) =>
//             Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(currentGenre))
//           );
//         }
//         if (currentYear) {
//           filteredMovies = filteredMovies.filter((movie) =>
//             movie.release_date && movie.release_date.startsWith(currentYear)
//           );
//         }
//         if (currentRating) {
//           filteredMovies = filteredMovies.filter((movie) =>
//             movie.vote_average && movie.vote_average >= Number(currentRating)
//           );
//         }
//         setMovies((prev) => {
//           const newMovies = filteredMovies.filter(
//             (newMovie) => !prev.some((m) => m.id === newMovie.id)
//           );
//           return [...prev, ...newMovies];
//         });
//         setHasMore(data.page < data.total_pages);
//       } catch (err) {
//         setError('Failed to load more movies.');
//       }
//     } else {
//       console.log(`Loading more trending movies, page: ${page + 1}`);
//       await fetchTrending();
//     }
//     setPage((prev) => prev + 1);
//   };

//   useEffect(() => {
//     if (!isSearching) {
//       fetchTrending();
//     }
//   }, [isSearching, page]);

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {isSearching ? 'Search Results' : 'Trending Movies'}
//       </Typography>
//       <SearchBar onSearch={handleSearch} />
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//           {error}
//         </Alert>
//       )}
//       {movies.length === 0 && !error && !isSearching && (
//         <Typography>Loading movies...</Typography>
//       )}
//       <Grid container spacing={2}>
//         {movies.map((movie) => (
//           <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
//             <MovieCard movie={movie} />
//           </Grid>
//         ))}
//       </Grid>
//       {hasMore && (
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Button variant="contained" onClick={loadMore}>
//             Load More
//           </Button>
//         </Box>
//       )}
//       {!hasMore && movies.length > 0 && (
//         <Typography sx={{ textAlign: 'center', mt: 4 }}>
//           No more movies to load.
//         </Typography>
//       )}
//     </Container>
//   );
// }

// export default Home;

import { useState, useEffect, useCallback, useContext } from 'react';
import { Container, Typography, Grid, Alert, Button, Box } from '@mui/material';
import { getTrendingMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

// Home page displaying trending movies or search results
function Home() {
  const { lastSearch } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentRating, setCurrentRating] = useState('');

  // Fetches trending movies from TMDb for the given page
  const fetchTrending = async () => {
    try {
      console.log(`Fetching trending movies, page: ${page}`);
      const data = await getTrendingMovies(page);
      setMovies((prev) => {
        const newMovies = data.results
          .filter((movie) => movie?.id && movie?.title)
          .filter((newMovie) => !prev.some((m) => m.id === newMovie.id));
        return [...prev, ...newMovies];
      });
      setHasMore(data.page < data.total_pages);
      setError('');
    } catch (err) {
      console.error('Error fetching trending movies:', err.message);
      setError('Unable to load trending movies. Please try again later.');
    }
  };

  // Handles search with query and filters, or resets to trending movies if empty
  const handleSearch = useCallback(async (query, genreId, year, rating) => {
    console.log(`Searching for: ${query}, genre: ${genreId}, year: ${year}, rating: ${rating}`);
    if (!query && !genreId && !year && !rating) {
      setIsSearching(false);
      setMovies([]);
      setPage(1);
      setCurrentQuery('');
      setCurrentGenre('');
      setCurrentYear('');
      setCurrentRating('');
      await fetchTrending();
      return;
    }
    setIsSearching(true);
    setMovies([]);
    setPage(1);
    setCurrentQuery(query);
    setCurrentGenre(genreId);
    setCurrentYear(year);
    setCurrentRating(rating);
    try {
      const data = await searchMovies(query, 1);
      let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
      if (genreId) {
        filteredMovies = filteredMovies.filter((movie) =>
          Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(genreId))
        );
      }
      if (year) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.release_date && movie.release_date.startsWith(year)
        );
      }
      if (rating) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.vote_average && movie.vote_average >= Number(rating)
        );
      }
      setMovies(filteredMovies);
      setHasMore(data.page < data.total_pages);
      if (filteredMovies.length === 0) {
        setError('No movies found for this search.');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Search failed. Please check your connection or try again.');
    }
  }, []);

  // Loads more movies based on search state or trending
  const loadMore = async () => {
    if (isSearching && (currentQuery || currentGenre || currentYear || currentRating)) {
      console.log(`Loading more search results, page: ${page + 1}`);
      try {
        const data = await searchMovies(currentQuery, page + 1);
        let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);
        if (currentGenre) {
          filteredMovies = filteredMovies.filter((movie) =>
            Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(currentGenre))
          );
        }
        if (currentYear) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.release_date && movie.release_date.startsWith(currentYear)
          );
        }
        if (currentRating) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.vote_average && movie.vote_average >= Number(currentRating)
          );
        }
        setMovies((prev) => {
          const newMovies = filteredMovies.filter(
            (newMovie) => !prev.some((m) => m.id === newMovie.id)
          );
          return [...prev, ...newMovies];
        });
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError('Failed to load more movies.');
      }
    } else {
      console.log(`Loading more trending movies, page: ${page + 1}`);
      await fetchTrending();
    }
    setPage((prev) => prev + 1);
  };

  // Initialize with last search if available, otherwise load trending movies
  useEffect(() => {
    if (lastSearch) {
      handleSearch(lastSearch, '', '', '');
    } else {
      fetchTrending();
    }
  }, [lastSearch, handleSearch]);

  useEffect(() => {
    if (!isSearching) {
      fetchTrending();
    }
  }, [isSearching, page]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isSearching ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {movies.length === 0 && !error && !isSearching && (
        <Typography>Loading movies...</Typography>
      )}
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </Box>
      )}
      {!hasMore && movies.length > 0 && (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No more movies to load.
        </Typography>
      )}
    </Container>
  );
}

export default Home;