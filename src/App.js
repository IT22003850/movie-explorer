import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { MovieProvider } from './context/MovieContext';
import { useThemeMode, getTheme } from './styles/theme';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  const { mode } = useThemeMode();

  return (
    <MovieProvider>
      <ThemeProvider theme={getTheme(mode)}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
}

export default App;