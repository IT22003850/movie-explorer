import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();
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
      </CardContent>
    </Card>
  );
}

export default MovieCard;