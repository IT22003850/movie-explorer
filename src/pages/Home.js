import { useState, useEffect, useCallback, useContext } from 'react';
import { Container, Typography, Grid, Alert, Button, Box } from '@mui/material';
import { getTrendingMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

// Home page component responsible for displaying trending or searched movies
function Home() {
  // Accessing lastSearch from MovieContext
  const { lastSearch } = useContext(MovieContext);

  // State variables
  const [movies, setMovies] = useState([]); // Holds the list of movies to display
  const [page, setPage] = useState(1); // Current page number for pagination
  const [hasMore, setHasMore] = useState(true); // Flag to check if more movies are available
  const [error, setError] = useState(''); // Error message display
  const [isSearching, setIsSearching] = useState(false); // Indicates if search is active
  const [currentQuery, setCurrentQuery] = useState(''); // Stores the current search query
  const [currentGenre, setCurrentGenre] = useState(''); // Stores the selected genre filter
  const [currentYear, setCurrentYear] = useState(''); // Stores the selected year filter
  const [currentRating, setCurrentRating] = useState(''); // Stores the selected rating filter

  // Fetch trending movies based on the current page
  const fetchTrending = async () => {
    try {
      console.log(`Fetching trending movies, page: ${page}`);
      const data = await getTrendingMovies(page);
      
      // Filter and avoid duplicates
      const newMovies = data.results
        .filter((movie) => movie?.id && movie?.title)
        .filter((newMovie) => !movies.some((m) => m.id === newMovie.id));

      // Append new movies to existing list
      setMovies((prev) => [...prev, ...newMovies]);

      // Update pagination state
      setHasMore(data.page < data.total_pages);
      setError('');
    } catch (err) {
      console.error('Error fetching trending movies:', err.message);
      setError('Unable to load trending movies. Please try again later.');
    }
  };

  // Handle search logic with query and filters
  const handleSearch = useCallback(async (query, genreId, year, rating) => {
    console.log(`Searching for: ${query}, genre: ${genreId}, year: ${year}, rating: ${rating}`);

    // If no search inputs, reset to trending
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

    // Prepare for search
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

      // Apply filters
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

      // Display message if no results
      if (filteredMovies.length === 0) {
        setError('No movies found for this search.');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Search failed. Please check your connection or try again.');
    }
  }, []);

  // Load more results based on current mode (searching or trending)
  const loadMore = async () => {
    // Load more search results
    if (isSearching && (currentQuery || currentGenre || currentYear || currentRating)) {
      console.log(`Loading more search results, page: ${page + 1}`);
      try {
        const data = await searchMovies(currentQuery, page + 1);
        let filteredMovies = (data.results || []).filter((movie) => movie?.id && movie?.title);

        // Apply filters again
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

        // Avoid duplicates and append new results
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
      // Load more trending movies
      console.log(`Loading more trending movies, page: ${page + 1}`);
      await fetchTrending();
    }

    // Increment page number
    setPage((prev) => prev + 1);
  };

  // On mount, run last search or fetch trending
  useEffect(() => {
    if (lastSearch) {
      handleSearch(lastSearch, '', '', '');
    } else {
      fetchTrending();
    }
  }, [lastSearch, handleSearch]);

  // Re-fetch trending movies when not searching and page changes
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

      {/* Search bar for user input */}
      <SearchBar onSearch={handleSearch} />

      {/* Display any errors */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Loading message when no movies yet */}
      {movies.length === 0 && !error && !isSearching && (
        <Typography>Loading movies...</Typography>
      )}

      {/* Movie grid */}
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid
            key={movie.id}
            sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* Load more button if more results exist */}
      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </Box>
      )}

      {/* Message if no more results to show */}
      {!hasMore && movies.length > 0 && (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No more movies to load.
        </Typography>
      )}
    </Container>
  );
}

export default Home;
