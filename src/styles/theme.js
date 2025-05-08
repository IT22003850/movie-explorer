import { createTheme } from '@mui/material/styles';
import { useState, useEffect, useMemo } from 'react';

export function useThemeMode() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('themeMode', mode);
    } catch (err) {
      console.error('Failed to save themeMode to localStorage:', err);
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggleTheme };
}

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });