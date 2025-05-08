import { useState, useEffect, useCallback, useContext } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

// SearchBar component for movie search and filters with reset functionality
function SearchBar({ onSearch }) {
  // Accessing values and functions from MovieContext
  const { lastSearch, genres, resetSearch, setLastSearch } = useContext(MovieContext);

  // Local state variables for query and filters
  const [query, setQuery] = useState(lastSearch);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [loading, setLoading] = useState(false);

  // Array of years for the "Year" dropdown (past 50 years)
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
  // Ratings from 8 to 1 for "Min Rating" dropdown
  const ratings = [8, 7, 6, 5, 4, 3, 2, 1];

  // Sync query input with context's lastSearch value
  useEffect(() => {
    setLastSearch(query);
  }, [query, setLastSearch]);

  // Create a debounced search function that triggers only after user stops typing
  const debouncedSearch = useCallback(() => {
    if (query.trim() || selectedGenre || selectedYear || selectedRating) {
      console.log(`Triggering search: query=${query}, genre=${selectedGenre}, year=${selectedYear}, rating=${selectedRating}`);
      onSearch(query.trim(), selectedGenre, selectedYear, selectedRating);
    }
  }, [query, selectedGenre, selectedYear, selectedRating, onSearch]);

  // Delay the search to reduce the number of API calls (500ms debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      debouncedSearch();
    }, 500);
    return () => clearTimeout(timeout); // Clear timeout if any filter changes before 500ms
  }, [query, selectedGenre, selectedYear, selectedRating, debouncedSearch]);

  // Reset search inputs and filters, reload trending movies
  const handleReset = () => {
    setQuery('');
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    resetSearch();
    onSearch('', '', '', '');
  };

  // Disable reset button when nothing is selected or typed
  const isResetDisabled = !query && !selectedGenre && !selectedYear && !selectedRating;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Text input for search query */}
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

      {/* Filters section with Genre, Year, and Rating dropdowns */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Genre filter dropdown */}
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

        {/* Year filter dropdown */}
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

        {/* Minimum rating filter dropdown */}
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

      {/* Reset button to clear all filters */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleReset}
        disabled={isResetDisabled}
        sx={{ width: '100%' }}
      >
        Reset Search
      </Button>

      {/* Loading indicator */}
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
}

export default SearchBar;
