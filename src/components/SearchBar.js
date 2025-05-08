import { useState, useEffect, useContext, useCallback } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { getGenres } from '../services/api';

function SearchBar({ onSearch }) {
  const { lastSearch, setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState(lastSearch);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error('Failed to fetch genres:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const debouncedSearch = useCallback(() => {
    if (query.trim() || selectedGenre) {
      console.log(`Triggering search: query=${query}, genre=${selectedGenre}`);
      onSearch(query.trim(), selectedGenre);
      setLastSearch(query.trim());
    }
  }, [query, selectedGenre, onSearch, setLastSearch]);

  useEffect(() => {
    const timeout = setTimeout(debouncedSearch, 500);
    return () => clearTimeout(timeout);
  }, [debouncedSearch]);

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth disabled={loading}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          label="Genre"
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
}

export default SearchBar;