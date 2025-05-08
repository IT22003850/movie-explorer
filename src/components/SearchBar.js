import { useState, useEffect, useContext } from 'react';
import { TextField, Box } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

function SearchBar({ onSearch }) {
  const { lastSearch, setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState(lastSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        onSearch(query);
        setLastSearch(query);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, onSearch, setLastSearch]);

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Box>
  );
}

export default SearchBar;