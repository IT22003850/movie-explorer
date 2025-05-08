import { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const isFavorite = favorites.includes(movie.id);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  return (
    <Card
      sx={{ maxWidth: 200, cursor: 'pointer', m: 1 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </Typography>
        <Typography variant="body2">
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              isFavorite ? removeFavorite(movie.id) : addFavorite(movie.id);
            }}
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;