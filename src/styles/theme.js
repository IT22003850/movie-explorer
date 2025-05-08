import { createTheme } from '@mui/material/styles';

// Function to generate theme based on the mode (light or dark)
export const getTheme = (mode) =>
  createTheme({
    // Define the color palette based on the selected mode
    palette: {
      mode, // This will be either 'light' or 'dark' based on the user's selection
      primary: {
        main: '#1976d2', // Primary color (blue)
      },
      secondary: {
        main: '#dc004e', // Secondary color (pink)
      },
      // Background colors for the default and paper components
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212', // Light or dark background for the page
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d', // Light or dark background for paper elements
      },
      // Text colors for primary and secondary text
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // Text color for primary text
        secondary: mode === 'light' ? '#666666' : '#bbbbbb', // Text color for secondary text
      },
    },
    // Typography settings (font family used in the app)
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Using Roboto font family for the app
    },
    // Custom component overrides for Material UI components
    components: {
      // Styling overrides for the MuiTextField component
      MuiTextField: {
        styleOverrides: {
          root: {
            // Background color for the input field based on the mode
            '& .MuiInputBase-root': {
              backgroundColor: mode === 'light' ? '#ffffff' : '#333333',
            },
            // Text color for the input based on the mode
            '& .MuiInputBase-input': {
              color: mode === 'light' ? '#000000' : '#ffffff',
            },
            // Label color for the input field based on the mode
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#666666' : '#bbbbbb',
            },
            // Styling for the input field's border
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: mode === 'light' ? '#666666' : '#bbbbbb', // Border color when not focused
              },
              // Border color on hover
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#000000' : '#ffffff',
              },
              // Border color when the input field is focused
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2', // Blue color when focused
              },
            },
            // Placeholder text color based on the mode
            '& .MuiInputBase-input::placeholder': {
              color: mode === 'light' ? '#666666' : '#bbbbbb',
              opacity: 1, // Ensure placeholder is fully visible
            },
          },
        },
      },
      // Styling overrides for the MuiSelect component
      MuiSelect: {
        styleOverrides: {
          select: {
            color: mode === 'light' ? '#000000' : '#ffffff', // Text color for the selected option
          },
          // Icon color for the select dropdown
          icon: {
            color: mode === 'light' ? '#666666' : '#bbbbbb',
          },
        },
      },
      // Styling overrides for the MuiInputLabel component
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#666666' : '#bbbbbb', // Color for labels in input fields
          },
        },
      },
      // Styling overrides for the MuiMenuItem component
      MuiMenuItem: {
        styleOverrides: {
          root: {
            // Text color for menu items
            color: mode === 'light' ? '#000000' : '#ffffff',
            // Background color for menu items
            backgroundColor: mode === 'light' ? '#ffffff' : '#1d1d1d',
            // Hover background color for menu items
            '&:hover': {
              backgroundColor: mode === 'light' ? '#f5f5f5' : '#333333',
            },
          },
        },
      },
    },
  });
