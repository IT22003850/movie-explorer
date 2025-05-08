import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.error('REACT_APP_TMDB_API_KEY is not set in .env file');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error.response?.data || error.message);
    throw new Error('Failed to fetch trending movies');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch search results:', error.response?.data || error.message);
    throw new Error('Failed to fetch search results');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error.response?.data || error.message);
    throw new Error('Failed to fetch movie details');
  }
};

export const getGenres = async () => {
  try {
    const response = await axiosInstance.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Failed to fetch genres:', error.response?.data || error.message);
    throw new Error('Failed to fetch genres');
  }
};