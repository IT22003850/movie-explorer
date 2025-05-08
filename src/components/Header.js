import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

// Import React Router's navigation hook
import { useNavigate } from 'react-router-dom';

// Import useContext to access global state
import { useContext } from 'react';

// Import MovieContext which holds theme, user, and auth functions
import { MovieContext } from '../context/MovieContext';

// Define the Header component
function Header() {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Destructure values from MovieContext: theme mode, toggle function, user object, and logout function
  const { themeMode, toggleTheme, user, logout } = useContext(MovieContext);

  return (
    // AppBar from Material UI for the top navigation bar
    <AppBar position="static">
      <Toolbar>
        {/* App title with space pushing remaining buttons to the right */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>

        {/* Navigation buttons for Home and Favorites */}
        <Button color="inherit" onClick={() => navigate('/home')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/favorites')}>
          Favorites
        </Button>

        {/* Conditionally render Logout button if user is logged in, otherwise show Login */}
        {user ? (
          <Button
            color="inherit"
            onClick={() => {
              logout();          // Call logout function from context
              navigate('/login'); // Redirect to login page
            }}
          >
            Logout ({user.username}) {/* Display username in logout button */}
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}

        {/* Theme toggle button with corresponding icon */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {/* Show moon icon in light mode, sun icon in dark mode */}
          {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

// Export the Header component
export default Header;
