import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { getMovieDetails, getMovieVideos, getMovieCredits } from '../services/api';

// Component for showing detailed information about a selected movie
function MovieDetails() {
  // Get the movie ID from the URL parameters
  const { id } = useParams();

  // State variables for movie data, trailer, cast, loading state, and errors
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch movie data when the component mounts or the movie ID changes
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch movie details, videos, and cast in parallel
        const [movieData, videoData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
          getMovieCredits(id),
        ]);

        // Set the fetched movie details
        setMovie(movieData);

        // Find the first YouTube trailer
        const trailerVideo = videoData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(trailerVideo);

        // Take top 5 cast members
        setCast(creditsData.cast.slice(0, 5));
      } catch (err) {
        // Set error message if fetching fails
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMovie(); // Call the async function
  }, [id]);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  // Show error alert if an error occurred
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // If no movie is found (null), show fallback message
  if (!movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">Movie not found.</Typography>
      </Container>
    );
  }

  // Display movie details
  return (
    <Container sx={{ py: 4 }}>
      {/* Movie title */}
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>

      {/* Poster and details in a responsive flexbox layout */}
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Poster image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '300px', borderRadius: '8px' }}
        />

        {/* Movie info section */}
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
          <Typography variant="body1">
            <strong>Cast:</strong> {cast.map((c) => c.name).join(', ') || 'N/A'}
          </Typography>

          {/* Show trailer link if available */}
          {trailer && (
            <Typography variant="body1" paragraph>
              <strong>Trailer:</strong>{' '}
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// Export the component
export default MovieDetails;
