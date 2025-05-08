import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Chip, Alert } from '@mui/material';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovie();
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!movie) return <Typography>Loading...</Typography>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        <Box>
          <img src={imageUrl} alt={movie.title} style={{ maxWidth: '100%' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || 'No overview available.'}
          </Typography>
          <Typography variant="body2">
            <strong>Release Date:</strong>{' '}
            {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Genres:</strong>{' '}
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1 }} />
            ))}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default MovieDetails;