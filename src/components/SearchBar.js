// // // // // import { useState, useEffect, useCallback, useContext } from 'react';
// // // // // import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// // // // // import { MovieContext } from '../context/MovieContext';
// // // // // import { getGenres } from '../services/api';

// // // // // function SearchBar({ onSearch }) {
// // // // //   const { lastSearch } = useContext(MovieContext);
// // // // //   const [query, setQuery] = useState(lastSearch);
// // // // //   const [genres, setGenres] = useState([]);
// // // // //   const [selectedGenre, setSelectedGenre] = useState('');
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchGenres = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const data = await getGenres();
// // // // //         setGenres(data);
// // // // //       } catch (err) {
// // // // //         console.error('Failed to fetch genres:', err.message);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchGenres();
// // // // //   }, []);

// // // // //   const debouncedSearch = useCallback(() => {
// // // // //     if (query.trim() || selectedGenre) {
// // // // //       console.log(`Triggering search: query=${query}, genre=${selectedGenre}`);
// // // // //       onSearch(query.trim(), selectedGenre);
// // // // //     }
// // // // //   }, [query, selectedGenre, onSearch]);

// // // // //   useEffect(() => {
// // // // //     const timeout = setTimeout(() => {
// // // // //       debouncedSearch();
// // // // //     }, 500);
// // // // //     return () => clearTimeout(timeout);
// // // // //   }, [query, selectedGenre, debouncedSearch]);

// // // // //   return (
// // // // //     <Box sx={{ mb: 4 }}>
// // // // //       <TextField
// // // // //         label="Search Movies"
// // // // //         variant="outlined"
// // // // //         fullWidth
// // // // //         value={query}
// // // // //         onChange={(e) => setQuery(e.target.value)}
// // // // //         sx={{ mb: 2 }}
// // // // //       />
// // // // //       <FormControl fullWidth disabled={loading}>
// // // // //         <InputLabel>Genre</InputLabel>
// // // // //         <Select
// // // // //           value={selectedGenre}
// // // // //           onChange={(e) => setSelectedGenre(e.target.value)}
// // // // //           label="Genre"
// // // // //         >
// // // // //           <MenuItem value="">All Genres</MenuItem>
// // // // //           {genres.map((genre) => (
// // // // //             <MenuItem key={genre.id} value={genre.id}>
// // // // //               {genre.name}
// // // // //             </MenuItem>
// // // // //           ))}
// // // // //         </Select>
// // // // //       </FormControl>
// // // // //       {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // export default SearchBar;

// // // // import { useState, useEffect, useCallback, useContext } from 'react';
// // // // import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// // // // import { MovieContext } from '../context/MovieContext';

// // // // function SearchBar({ onSearch }) {
// // // //   const { lastSearch, genres } = useContext(MovieContext);
// // // //   const [query, setQuery] = useState(lastSearch);
// // // //   const [selectedGenre, setSelectedGenre] = useState('');
// // // //   const [selectedYear, setSelectedYear] = useState('');
// // // //   const [selectedRating, setSelectedRating] = useState('');
// // // //   const [loading, setLoading] = useState(false);

// // // //   const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
// // // //   const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

// // // //   const debouncedSearch = useCallback(() => {
// // // //     if (query.trim() || selectedGenre || selectedYear || selectedRating) {
// // // //       console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
// // // //       onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
// // // //     }
// // // //   }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

// // // //   useEffect(() => {
// // // //     const timeout = setTimeout(() => {
// // // //       debouncedSearch();
// // // //     }, 500);
// // // //     return () => clearTimeout(timeout);
// // // //   }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

// // // //   return (
// // // //     <Box sx={{ mb: 4 }}>
// // // //       <TextField
// // // //         label="Search Movies"
// // // //         variant="outlined"
// // // //         fullWidth
// // // //         value={query}
// // // //         onChange={(e) => setQuery(e.target.value)}
// // // //         sx={{ mb: 2 }}
// // // //       />
// // // //       <Box sx={{ display: 'flex', gap: 2 }}>
// // // //         <FormControl fullWidth disabled={loading}>
// // // //           <InputLabel>Genre</InputLabel>
// // // //           <Select
// // // //             value={selectedGenre}
// // // //             onChange={(e) => setSelectedGenre(e.target.value)}
// // // //             label="Genre"
// // // //           >
// // // //             <MenuItem value="">All Genres</MenuItem>
// // // //             {genres.map((genre) => (
// // // //               <MenuItem key={genre.id} value={genre.id}>
// // // //                 {genre.name}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </FormControl>
// // // //         <FormControl fullWidth>
// // // //           <InputLabel>Year</InputLabel>
// // // //           <Select
// // // //             value={selectedYear}
// // // //             onChange={(e) => setSelectedYear(e.target.value)}
// // // //             label="Year"
// // // //           >
// // // //             <MenuItem value="">All Years</MenuItem>
// // // //             {years.map((year) => (
// // // //               <MenuItem key={year} value={year}>
// // // //                 {year}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </FormControl>
// // // //         <FormControl fullWidth>
// // // //           <InputLabel>Min Rating</InputLabel>
// // // //           <Select
// // // //             value={selectedRating}
// // // //             onChange={(e) => setSelectedRating(e.target.value)}
// // // //             label="Min Rating"
// // // //           >
// // // //             <MenuItem value="">All Ratings</MenuItem>
// // // //             {ratings.map((rating) => (
// // // //               <MenuItem key={rating} value={rating}>
// // // //                 {rating}+
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </FormControl>
// // // //       </Box>
// // // //       {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
// // // //     </Box>
// // // //   );
// // // // }

// // // // export default SearchBar;
// // // import { useState, useEffect, useCallback, useContext } from 'react';
// // // import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// // // import { MovieContext } from '../context/MovieContext';

// // // function SearchBar({ onSearch }) {
// // //   const { lastSearch, genres } = useContext(MovieContext);
// // //   const [query, setQuery] = useState(lastSearch);
// // //   const [selectedGenre, setSelectedGenre] = useState('');
// // //   const [selectedYear, setSelectedYear] = useState('');
// // //   const [selectedRating, setSelectedRating] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
// // //   const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

// // //   const debouncedSearch = useCallback(() => {
// // //     if (query.trim() || selectedGenre || selectedYear || selectedRating) {
// // //       console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
// // //       onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
// // //     }
// // //   }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

// // //   useEffect(() => {
// // //     const timeout = setTimeout(() => {
// // //       debouncedSearch();
// // //     }, 500);
// // //     return () => clearTimeout(timeout);
// // //   }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

// // //   return (
// // //     <Box sx={{ mb: 4 }}>
// // //       <TextField
// // //         label="Search Movies"
// // //         variant="outlined"
// // //         fullWidth
// // //         value={query}
// // //         onChange={(e) => setQuery(e.target.value)}
// // //         sx={{
// // //           mb: 2,
// // //           '& .MuiInputBase-input': {
// // //             color: (theme) => theme.palette.text.primary,
// // //           },
// // //           '& .MuiInputLabel-root': {
// // //             color: (theme) => theme.palette.text.secondary,
// // //           },
// // //           '& .MuiOutlinedInput-root': {
// // //             '& fieldset': {
// // //               borderColor: (theme) => theme.palette.text.secondary,
// // //             },
// // //             '&:hover fieldset': {
// // //               borderColor: (theme) => theme.palette.text.primary,
// // //             },
// // //             '&.Mui-focused fieldset': {
// // //               borderColor: (theme) => theme.palette.primary.main,
// // //             },
// // //           },
// // //         }}
// // //       />
// // //       <Box sx={{ display: 'flex', gap: 2 }}>
// // //         <FormControl fullWidth disabled={loading}>
// // //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// // //             Genre
// // //           </InputLabel>
// // //           <Select
// // //             value={selectedGenre}
// // //             onChange={(e) => setSelectedGenre(e.target.value)}
// // //             label="Genre"
// // //             sx={{
// // //               color: (theme) => theme.palette.text.primary,
// // //               '& .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.secondary,
// // //               },
// // //               '&:hover .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.primary,
// // //               },
// // //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.primary.main,
// // //               },
// // //             }}
// // //           >
// // //             <MenuItem value="">All Genres</MenuItem>
// // //             {genres.map((genre) => (
// // //               <MenuItem key={genre.id} value={genre.id}>
// // //                 {genre.name}
// // //               </MenuItem>
// // //             ))}
// // //           </Select>
// // //         </FormControl>
// // //         <FormControl fullWidth>
// // //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// // //             Year
// // //           </InputLabel>
// // //           <Select
// // //             value={selectedYear}
// // //             onChange={(e) => setSelectedYear(e.target.value)}
// // //             label="Year"
// // //             sx={{
// // //               color: (theme) => theme.palette.text.primary,
// // //               '& .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.secondary,
// // //               },
// // //               '&:hover .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.primary,
// // //               },
// // //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.primary.main,
// // //               },
// // //             }}
// // //           >
// // //             <MenuItem value="">All Years</MenuItem>
// // //             {years.map((year) => (
// // //               <MenuItem key={year} value={year}>
// // //                 {year}
// // //               </MenuItem>
// // //             ))}
// // //           </Select>
// // //         </FormControl>
// // //         <FormControl fullWidth>
// // //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// // //             Min Rating
// // //           </InputLabel>
// // //           <Select
// // //             value={selectedRating}
// // //             onChange={(e) => setSelectedRating(e.target.value)}
// // //             label="Min Rating"
// // //             sx={{
// // //               color: (theme) => theme.palette.text.primary,
// // //               '& .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.secondary,
// // //               },
// // //               '&:hover .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.text.primary,
// // //               },
// // //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                 borderColor: (theme) => theme.palette.primary.main,
// // //               },
// // //             }}
// // //           >
// // //             <MenuItem value="">All Ratings</MenuItem>
// // //             {ratings.map((rating) => (
// // //               <MenuItem key={rating} value={rating}>
// // //                 {rating}+
// // //               </MenuItem>
// // //             ))}
// // //           </Select>
// // //         </FormControl>
// // //       </Box>
// // //       {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
// // //     </Box>
// // //   );
// // // }

// // // export default SearchBar;

// // import { useState, useEffect, useCallback, useContext } from 'react';
// // import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// // import { MovieContext } from '../context/MovieContext';

// // function SearchBar({ onSearch }) {
// //   const { lastSearch, genres } = useContext(MovieContext);
// //   const [query, setQuery] = useState(lastSearch);
// //   const [selectedGenre, setSelectedGenre] = useState('');
// //   const [selectedYear, setSelectedYear] = useState('');
// //   const [selectedRating, setSelectedRating] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
// //   const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

// //   const debouncedSearch = useCallback(() => {
// //     if (query.trim() || selectedGenre || selectedYear || selectedRating) {
// //       console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
// //       onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
// //     }
// //   }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

// //   useEffect(() => {
// //     const timeout = setTimeout(() => {
// //       debouncedSearch();
// //     }, 500);
// //     return () => clearTimeout(timeout);
// //   }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

// //   return (
// //     <Box sx={{ mb: 4 }}>
// //       <TextField
// //         label="Search Movies"
// //         variant="outlined"
// //         fullWidth
// //         value={query}
// //         onChange={(e) => setQuery(e.target.value)}
// //         sx={{
// //           mb: 2,
// //           '& .MuiInputBase-root': {
// //             backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333333' : '#ffffff',
// //           },
// //           '& .MuiInputBase-input': {
// //             color: (theme) => theme.palette.text.primary,
// //           },
// //           '& .MuiInputLabel-root': {
// //             color: (theme) => theme.palette.text.secondary,
// //           },
// //           '& .MuiOutlinedInput-root': {
// //             '& fieldset': {
// //               borderColor: (theme) => theme.palette.text.secondary,
// //             },
// //             '&:hover fieldset': {
// //               borderColor: (theme) => theme.palette.text.primary,
// //             },
// //             '&.Mui-focused fieldset': {
// //               borderColor: (theme) => theme.palette.primary.main,
// //             },
// //           },
// //           '& .MuiInputBase-input::placeholder': {
// //             color: (theme) => theme.palette.text.secondary,
// //             opacity: 1,
// //           },
// //         }}
// //       />
// //       <Box sx={{ display: 'flex', gap: 2 }}>
// //         <FormControl fullWidth disabled={loading}>
// //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// //             Genre
// //           </InputLabel>
// //           <Select
// //             value={selectedGenre}
// //             onChange={(e) => setSelectedGenre(e.target.value)}
// //             label="Genre"
// //             sx={{
// //               color: (theme) => theme.palette.text.primary,
// //               '& .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.secondary,
// //               },
// //               '&:hover .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.primary,
// //               },
// //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.primary.main,
// //               },
// //             }}
// //           >
// //             <MenuItem value="">All Genres</MenuItem>
// //             {genres.map((genre) => (
// //               <MenuItem key={genre.id} value={genre.id}>
// //                 {genre.name}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //         <FormControl fullWidth>
// //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// //             Year
// //           </InputLabel>
// //           <Select
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(e.target.value)}
// //             label="Year"
// //             sx={{
// //               color: (theme) => theme.palette.text.primary,
// //               '& .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.secondary,
// //               },
// //               '&:hover .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.primary,
// //               },
// //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.primary.main,
// //               },
// //             }}
// //           >
// //             <MenuItem value="">All Years</MenuItem>
// //             {years.map((year) => (
// //               <MenuItem key={year} value={year}>
// //                 {year}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //         <FormControl fullWidth>
// //           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
// //             Min Rating
// //           </InputLabel>
// //           <Select
// //             value={selectedRating}
// //             onChange={(e) => setSelectedRating(e.target.value)}
// //             label="Min Rating"
// //             sx={{
// //               color: (theme) => theme.palette.text.primary,
// //               '& .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.secondary,
// //               },
// //               '&:hover .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.text.primary,
// //               },
// //               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                 borderColor: (theme) => theme.palette.primary.main,
// //               },
// //             }}
// //           >
// //             <MenuItem value="">All Ratings</MenuItem>
// //             {ratings.map((rating) => (
// //               <MenuItem key={rating} value={rating}>
// //                 {rating}+
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       </Box>
// //       {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
// //     </Box>
// //   );
// // }

// // export default SearchBar;

// import { useState, useEffect, useCallback, useContext } from 'react';
// import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
// import { MovieContext } from '../context/MovieContext';

// function SearchBar({ onSearch }) {
//   const { lastSearch, genres, resetSearch } = useContext(MovieContext);
//   const [query, setQuery] = useState(lastSearch);
//   const [selectedGenre, setSelectedGenre] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedRating, setSelectedRating] = useState('');
//   const [loading, setLoading] = useState(false);

//   const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
//   const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

//   const debouncedSearch = useCallback(() => {
//     if (query.trim() || selectedGenre || selectedYear || selectedRating) {
//       console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
//       onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
//     }
//   }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       debouncedSearch();
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

//   const handleReset = () => {
//     setQuery('');
//     setSelectedGenre('');
//     setSelectedYear('');
//     setSelectedRating('');
//     resetSearch();
//     onSearch('', '', '', '');
//   };

//   const isResetDisabled = !query && !selectedGenre && !selectedYear && !selectedRating;

//   return (
//     <Box sx={{ mb: 4 }}>
//       <TextField
//         label="Search Movies"
//         variant="outlined"
//         fullWidth
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         sx={{
//           mb: 2,
//           '& .MuiInputBase-root': {
//             backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333333' : '#ffffff',
//           },
//           '& .MuiInputBase-input': {
//             color: (theme) => theme.palette.text.primary,
//           },
//           '& .MuiInputLabel-root': {
//             color: (theme) => theme.palette.text.secondary,
//           },
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: (theme) => theme.palette.text.secondary,
//             },
//             '&:hover fieldset': {
//               borderColor: (theme) => theme.palette.text.primary,
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: (theme) => theme.palette.primary.main,
//             },
//           },
//           '& .MuiInputBase-input::placeholder': {
//             color: (theme) => theme.palette.text.secondary,
//             opacity: 1,
//           },
//         }}
//       />
//       <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//         <FormControl fullWidth disabled={loading}>
//           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
//             Genre
//           </InputLabel>
//           <Select
//             value={selectedGenre}
//             onChange={(e) => setSelectedGenre(e.target.value)}
//             label="Genre"
//             sx={{
//               color: (theme) => theme.palette.text.primary,
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.secondary,
//               },
//               '&:hover .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.primary,
//               },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.primary.main,
//               },
//             }}
//           >
//             <MenuItem value="">All Genres</MenuItem>
//             {genres.map((genre) => (
//               <MenuItem key={genre.id} value={genre.id}>
//                 {genre.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
//             Year
//           </InputLabel>
//           <Select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             label="Year"
//             sx={{
//               color: (theme) => theme.palette.text.primary,
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.secondary,
//               },
//               '&:hover .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.primary,
//               },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.primary.main,
//               },
//             }}
//           >
//             <MenuItem value="">All Years</MenuItem>
//             {years.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
//             Min Rating
//           </InputLabel>
//           <Select
//             value={selectedRating}
//             onChange={(e) => setSelectedRating(e.target.value)}
//             label="Min Rating"
//             sx={{
//               color: (theme) => theme.palette.text.primary,
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.secondary,
//               },
//               '&:hover .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.text.primary,
//               },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: (theme) => theme.palette.primary.main,
//               },
//             }}
//           >
//             <MenuItem value="">All Ratings</MenuItem>
//             {ratings.map((rating) => (
//               <MenuItem key={rating} value={rating}>
//                 {rating}+
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>
//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={handleReset}
//         disabled={isResetDisabled}
//         sx={{ width: '100%' }}
//       >
//         Reset Search
//       </Button>
//       {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
//     </Box>
//   );
// }

// export default SearchBar;

import { useState, useEffect, useCallback, useContext } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

// SearchBar component for movie search and filters with reset functionality
function SearchBar({ onSearch }) {
  const { lastSearch, genres, resetSearch, setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState(lastSearch);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [loading, setLoading] = useState(false);

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
  const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

  // Update lastSearch in MovieContext when query changes
  useEffect(() => {
    setLastSearch(query);
  }, [query, setLastSearch]);

  const debouncedSearch = useCallback(() => {
    if (query.trim() || selectedGenre || selectedYear || selectedRating) {
      console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
      onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
    }
  }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      debouncedSearch();
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

  // Resets search query, filters, and triggers trending movies load
  const handleReset = () => {
    setQuery('');
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    resetSearch();
    onSearch('', '', '', '');
  };

  const isResetDisabled = !query && !selectedGenre && !selectedYear && !selectedRating;

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiInputBase-root': {
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333333' : '#ffffff',
          },
          '& .MuiInputBase-input': {
            color: (theme) => theme.palette.text.primary,
          },
          '& .MuiInputLabel-root': {
            color: (theme) => theme.palette.text.secondary,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: (theme) => theme.palette.text.secondary,
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.text.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.primary.main,
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: (theme) => theme.palette.text.secondary,
            opacity: 1,
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth disabled={loading}>
          <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
            Genre
          </InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
            sx={{
              color: (theme) => theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.primary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
            Year
          </InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
            sx={{
              color: (theme) => theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.primary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel sx={{ color: (theme) => theme.palette.text.secondary }}>
            Min Rating
          </InputLabel>
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            label="Min Rating"
            sx={{
              color: (theme) => theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.secondary,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.text.primary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">All Ratings</MenuItem>
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}+
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleReset}
        disabled={isResetDisabled}
        sx={{ width: '100%' }}
      >
        Reset Search
      </Button>
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
}

export default SearchBar;