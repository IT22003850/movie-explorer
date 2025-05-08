import { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Alert } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { getMovieDetails } from '../services/api';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const moviePromises = favorites.map((id) => getMovieDetails(id));
        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (err) {
        setError('Failed to load favorites');
      }
    };
    fetchFavorites();
  }, [favorites]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">No favorite movies yet.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Favorites;