import axios from 'axios'; // Importing axios for making HTTP requests

// Fetch the API key from environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for TMDb API

// Check if API_KEY is set, log an error if it's not
if (!API_KEY) {
  console.error('REACT_APP_TMDB_API_KEY is not set in .env file');
}

// Creating an axios instance with the base URL and default parameters
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests
  params: {
    api_key: API_KEY, // Attach the API key to all requests
  },
});

// Function to fetch trending movies for the current week
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/trending/movie/week', {
      params: { page }, // Pass the page number to paginate results
    });
    return response.data; // Return the response data containing the movie list
  } catch (error) {
    console.error('Failed to fetch trending movies:', error.response?.data || error.message);
    throw new Error('Failed to fetch trending movies'); // Throw an error if the request fails
  }
};

// Function to search for movies based on a query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query, page }, // Pass the query and page number for pagination
    });
    return response.data; // Return the response data containing the search results
  } catch (error) {
    console.error('Failed to fetch search results:', error.response?.data || error.message);
    throw new Error('Failed to fetch search results'); // Throw an error if the request fails
  }
};

// Function to fetch detailed information for a movie by its ID
export const getMovieDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`); // Request movie details using its ID
    return response.data; // Return the detailed movie information
  } catch (error) {
    console.error('Failed to fetch movie details:', error.response?.data || error.message);
    throw new Error('Failed to fetch movie details'); // Throw an error if the request fails
  }
};

// Function to fetch the list of available movie genres
export const getGenres = async () => {
  try {
    const response = await axiosInstance.get('/genre/movie/list'); // Request list of genres
    return response.data.genres; // Return the list of genres from the response
  } catch (error) {
    console.error('Failed to fetch genres:', error.response?.data || error.message);
    throw new Error('Failed to fetch genres'); // Throw an error if the request fails
  }
};

// Function to fetch movie videos (e.g., trailers) by movie ID
export const getMovieVideos = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/videos`); // Request videos for the movie by ID
    return response.data; // Return the videos associated with the movie
  } catch (error) {
    console.error('Failed to fetch movie videos:', error.response?.data || error.message);
    throw new Error('Failed to fetch movie videos'); // Throw an error if the request fails
  }
};

// Function to fetch movie credits (e.g., cast and crew) by movie ID
export const getMovieCredits = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/credits`); // Request credits for the movie by ID
    return response.data; // Return the credits information for the movie
  } catch (error) {
    console.error('Failed to fetch movie credits:', error.response?.data || error.message);
    throw new Error('Failed to fetch movie credits'); // Throw an error if the request fails
  }
};
