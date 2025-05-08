import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    throw new Error('Failed to fetch genres');
  }
};