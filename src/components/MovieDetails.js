import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">Movie not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '300px', borderRadius: '8px' }}
        />
        <Box>
          <Typography variant="body1" paragraph>
            <strong>Overview:</strong> {movie.overview}
          </Typography>
          <Typography variant="body1">
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Typography variant="body1">
            <strong>Rating:</strong> {movie.vote_average}/10
          </Typography>
          <Typography variant="body1">
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default MovieDetails;