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

  const fetchTrending = async () => {
    try {
      const data = await getTrendingMovies(page);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    setMovies([]);
    setPage(1);
    try {
      const data = await searchMovies(query, 1);
      setMovies(data.results);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchTrending();
    }
  }, [page, isSearching]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isSearching ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <SearchBar onSearch={handleSearch} />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Typography>Loading...</Typography>}
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