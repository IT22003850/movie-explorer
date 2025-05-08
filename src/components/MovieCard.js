import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { MovieContext } from '../context/MovieContext';

// Define the MovieCard component and receive a single movie object as a prop
function MovieCard({ movie }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext); // Get favorites and functions from context

  // Safely extract movie properties with fallbacks
  const movieId = movie?.id || null;
  const title = movie?.title || 'Unknown Title';
  const posterPath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` // Valid image path
    : 'https://via.placeholder.com/200x300?text=No+Image'; // Fallback image
  const genreIds = Array.isArray(movie?.genre_ids) ? movie.genre_ids : [];
  const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : 'Unknown';
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Check if this movie is already in the favorites list
  const isFavorited = favorites.some((fav) => fav.id === movieId);

  // Get the genre names from context using genre IDs
  const { genres } = useContext(MovieContext);
  const genreNames = genreIds.length > 0
    ? genreIds.map((id) => genres.find((g) => g.id === id)?.name || 'Unknown').join(', ')
    : 'No Genres';

  // Return null if the movie object is invalid
  if (!movieId) {
    console.warn('Invalid movie object:', movie);
    return null;
  }

  // Toggle favorite status when the icon is clicked
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick (navigation)
    if (isFavorited) {
      removeFavorite(movieId); // Remove from favorites
    } else {
      addFavorite(movie); // Add to favorites
    }
  };

  return (
    // Card component representing the movie
    <Card
      sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
      onClick={() => navigate(`/movie/${movieId}`)} // Navigate to movie details page
    >
      {/* Movie poster image */}
      <CardMedia
        component="img"
        height="300"
        image={posterPath}
        alt={title}
      />
      <CardContent sx={{ position: 'relative' }}>
        {/* Movie title (no wrap for long titles) */}
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        {/* Release year */}
        <Typography variant="body2" color="text.secondary">
          Year: {releaseYear}
        </Typography>
        {/* Average rating */}
        <Typography variant="body2" color="text.secondary">
          Rating: {rating}/10
        </Typography>
        {/* Genre names */}
        <Typography variant="body2" color="text.secondary">
          Genres: {genreNames}
        </Typography>

        {/* Favorite icon button positioned at the bottom right */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          <IconButton
            onClick={handleFavoriteToggle} // Toggle favorite status
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.6)'
                  : 'rgba(255, 255, 255, 0.6)',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)',
              },
            }}
          >
            {/* Conditionally show filled or outlined favorite icon */}
            {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

// Export the MovieCard component
export default MovieCard;
