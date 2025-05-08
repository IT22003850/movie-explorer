import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Alert } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTrendingMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');

  const fetchTrending = async () => {
    try {
      console.log(`Fetching trending movies, page: ${page}`);
      const data = await getTrendingMovies(page);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError('Unable to load trending movies. Please try again later.');
    }
  };

  const handleSearch = async (query, genreId) => {
    console.log(`Searching for: ${query}, genre: ${genreId}`);
    if (!query && !genreId) {
      setIsSearching(false);
      setMovies([]);
      setPage(1);
      setCurrentQuery('');
      setCurrentGenre('');
      return;
    }
    setIsSearching(true);
    setMovies([]);
    setPage(1);
    setCurrentQuery(query);
    setCurrentGenre(genreId);
    try {
      const data = await searchMovies(query, 1);
      let filteredMovies = data.results || [];
      if (genreId) {
        filteredMovies = data.results.filter((movie) =>
          movie.genre_ids.includes(Number(genreId))
        );
      }
      setMovies(filteredMovies);
      setHasMore(data.page < data.total_pages);
      if (filteredMovies.length === 0) {
        setError('No movies found for this search.');
      }
    } catch (err) {
      setError('Search failed. Please check your connection or try again.');
    }
  };

  const loadMore = () => {
    if (isSearching && (currentQuery || currentGenre)) {
      console.log(`Loading more search results, page: ${page + 1}`);
      searchMovies(currentQuery, page + 1).then((data) => {
        let filteredMovies = data.results || [];
        if (currentGenre) {
          filteredMovies = data.results.filter((movie) =>
            movie.genre_ids.includes(Number(currentGenre))
          );
        }
        setMovies((prev) => [...prev, ...filteredMovies]);
        setHasMore(data.page < data.total_pages);
      }).catch(() => {
        setError('Failed to load more movies.');
      });
    } else {
      console.log(`Loading more trending movies, page: ${page + 1}`);
      fetchTrending();
    }
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchTrending();
    }
  }, [page, isSearching]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isSearching ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <SearchBar onSearch={handleSearch} />
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
        {error}
      </Alert>}
      {movies.length === 0 && !error && !isSearching && (
        <Typography>Loading movies...</Typography>
      )}
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Typography>Loading...</Typography>}
        endMessage={<Typography>No more movies to load.</Typography>}
      >
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}

export default Home;