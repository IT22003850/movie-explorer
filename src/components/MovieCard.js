// // import { useNavigate } from 'react-router-dom';
// // import { useContext } from 'react';
// // import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
// // import { Favorite, FavoriteBorder } from '@mui/icons-material';
// // import { MovieContext } from '../context/MovieContext';

// // function MovieCard({ movie }) {
// //   const navigate = useNavigate();
// //   const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);

// //   // Log movie prop to debug
// //   console.log('MovieCard movie:', movie);

// //   // Safely access movie properties
// //   const movieId = movie?.id || null;
// //   const title = movie?.title || 'Unknown Title';
// //   const posterPath = movie?.poster_path
// //     ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
// //     : 'https://via.placeholder.com/200x300?text=No+Image';
// //   const genreIds = Array.isArray(movie?.genre_ids) ? movie.genre_ids : [];

// //   // Check if movie is favorited
// //   const isFavorited = favorites.some((fav) => fav.id === movieId);

// //   // Optional: Map genre IDs to names (requires genres from context or API)
// //   const genreNames = genreIds.length > 0 ? genreIds.join(', ') : 'No Genres';

// //   if (!movieId) {
// //     console.warn('Invalid movie object:', movie);
// //     return null; // Skip rendering invalid movies
// //   }

// //   const handleFavoriteToggle = (e) => {
// //     e.stopPropagation(); // Prevent card click from navigating
// //     if (isFavorited) {
// //       removeFavorite(movieId);
// //     } else {
// //       addFavorite(movie);
// //     }
// //   };

// //   return (
// //     <Card
// //       sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
// //       onClick={() => navigate(`/movie/${movieId}`)}
// //     >
// //       <CardMedia
// //         component="img"
// //         height="300"
// //         image={posterPath}
// //         alt={title}
// //       />
// //       <CardContent>
// //         <Typography variant="h6" noWrap>
// //           {title}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           Genres: {genreNames}
// //         </Typography>
// //       </CardContent>
// //       <IconButton
// //         sx={{ position: 'absolute', top: 8, right: 8 }}
// //         onClick={handleFavoriteToggle}
// //       >
// //         {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
// //       </IconButton>
// //     </Card>
// //   );
// // }

// // export default MovieCard;

// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
// import { Favorite, FavoriteBorder } from '@mui/icons-material';
// import { MovieContext } from '../context/MovieContext';

// function MovieCard({ movie }) {
//   const navigate = useNavigate();
//   const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);

//   // Safely access movie properties
//   const movieId = movie?.id || null;
//   const title = movie?.title || 'Unknown Title';
//   const posterPath = movie?.poster_path
//     ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
//     : 'https://via.placeholder.com/200x300?text=No+Image';
//   const genreIds = Array.isArray(movie?.genre_ids) ? movie.genre_ids : [];
//   const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : 'Unknown';
//   const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

//   // Check if movie is favorited
//   const isFavorited = favorites.some((fav) => fav.id === movieId);

//   // Map genre IDs to names using context genres
//   const { genres } = useContext(MovieContext);
//   const genreNames = genreIds.length > 0
//     ? genreIds.map((id) => genres.find((g) => g.id === id)?.name || 'Unknown').join(', ')
//     : 'No Genres';

//   if (!movieId) {
//     console.warn('Invalid movie object:', movie);
//     return null;
//   }

//   const handleFavoriteToggle = (e) => {
//     e.stopPropagation();
//     if (isFavorited) {
//       removeFavorite(movieId);
//     } else {
//       addFavorite(movie);
//     }
//   };

//   return (
//     <Card
//       sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
//       onClick={() => navigate(`/movie/${movieId}`)}
//     >
//       <CardMedia
//         component="img"
//         height="300"
//         image={posterPath}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="h6" noWrap>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Year: {releaseYear}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Rating: {rating}/10
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Genres: {genreNames}
//         </Typography>
//       </CardContent>
//       <IconButton
//         sx={{ position: 'absolute', top: 8, right: 8 }}
//         onClick={handleFavoriteToggle}
//       >
//         {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
//       </IconButton>
//     </Card>
//   );
// }

// export default MovieCard;

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { MovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);

  // Safely access movie properties
  const movieId = movie?.id || null;
  const title = movie?.title || 'Unknown Title';
  const posterPath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';
  const genreIds = Array.isArray(movie?.genre_ids) ? movie.genre_ids : [];
  const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : 'Unknown';
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Check if movie is favorited
  const isFavorited = favorites.some((fav) => fav.id === movieId);

  // Map genre IDs to names using context genres
  const { genres } = useContext(MovieContext);
  const genreNames = genreIds.length > 0
    ? genreIds.map((id) => genres.find((g) => g.id === id)?.name || 'Unknown').join(', ')
    : 'No Genres';

  if (!movieId) {
    console.warn('Invalid movie object:', movie);
    return null;
  }

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(movieId);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Card
      sx={{ cursor: 'pointer', height: '100%', position: 'relative' }}
      onClick={() => navigate(`/movie/${movieId}`)}
    >
      <CardMedia
        component="img"
        height="300"
        image={posterPath}
        alt={title}
      />
      <CardContent sx={{ position: 'relative' }}>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {releaseYear}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating}/10
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genres: {genreNames}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          <IconButton
            onClick={handleFavoriteToggle}
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              },
            }}
          >
            {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;