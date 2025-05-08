import { useState, useEffect, useContext } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { getGenres } from '../services/api';

function SearchBar({ onSearch }) {
  const { lastSearch, setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState(lastSearch);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query || selectedGenre) {
        onSearch(query, selectedGenre);
        setLastSearch(query);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, selectedGenre, onSearch, setLastSearch]);

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
      <FormControl fullWidth>
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
    </Box>
  );
}

export default SearchBar;