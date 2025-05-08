import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../styles/theme';

function Header() {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/favorites')}>
          Favorites
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;