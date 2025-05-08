import { useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';

// Import the MovieContext which holds global movie-related state
import { MovieContext } from '../context/MovieContext';

// Import the MovieCard component used to display each movie
import MovieCard from './MovieCard';

// Define the Favorites component
function Favorites() {
  // Access the 'favorites' array from the MovieContext
  const { favorites } = useContext(MovieContext);

  return (
    // Use Material UI Container with vertical padding
    <Container sx={{ py: 4 }}>
      {/* Title for the favorites section */}
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>

      {/* Show a message if there are no favorite movies */}
      {favorites.length === 0 ? (
        <Typography>No favorite movies yet.</Typography>
      ) : (
        // Display favorite movies using a responsive Grid layout
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            // Each movie is placed in its own Grid item with responsive width
            <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
              {/* Render the MovieCard component for each favorite movie */}
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

// Export the Favorites component so it can be used in other parts of the app
export default Favorites;
