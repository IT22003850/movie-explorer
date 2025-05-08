// import { useContext } from 'react';
// import { Container, Typography, Grid } from '@mui/material';
// import { MovieContext } from '../context/MovieContext';
// import MovieCard from './MovieCard';

// function Favorites() {
//   const { favorites } = useContext(MovieContext);

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Favorite Movies
//       </Typography>
//       {favorites.length === 0 ? (
//         <Typography>No favorite movies yet.</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {favorites.map((movie) => (
//             <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
//               <MovieCard movie={movie} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// }

// export default Favorites;

import { useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';

function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid key={movie.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;