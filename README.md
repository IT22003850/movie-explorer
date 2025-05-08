# Movie Explorer App

A React-based web application for browsing, searching, and favoriting movies using the TMDb API. The app features a responsive, mobile-first UI with light/dark mode, persistent search, youtube trailers, user authentication, and advanced filtering, deployed on Netlify.

## Live Demo
https://movie-explorer-thilina.netlify.app/

## Features
- **Trending Movies**: Browse trending movies from TMDb with a "Load More" button for pagination.
- **Search & Filters**: Search movies by title, filter by genre, release year, and minimum rating.
- **Search Persistence**: Retains the last searched movie query in `localStorage`, restoring it on page refresh.
- **Reset Search**: Clears search query and filters to return to trending movies.
- **Movie Details**: Displays detailed movie info, including cast and YouTube trailer links.
- **Favorites**: Add/remove movies to a favorites list, persisted in `localStorage`.
- **Authentication**: Simple login/logout system with username/password, stored in `localStorage`.
- **Light/Dark Mode**: Toggle between themes with high-contrast inputs and visible UI elements (e.g., search box text, favorites button).
- **Responsive Design**: Mobile-first layout using Material-UI Grid, adapting to screen sizes (1-column on mobile, 4-column on desktop).
- **Error Handling**: User-friendly alerts for API failures or empty search results.

## Tech Stack
- **Frontend**: React, Material-UI (MUI), React Router
- **State Management**: React Context API, `localStorage`
- **API**: The Movie Database (TMDb) API
- **Deployment**: Netlify
- **Tools**: Webpack, ESLint, GitLab/Github

## Project Structure
```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Favorites.js   # Favorites list page
│   │   ├── Header.js      # Navigation bar with login/theme toggle
│   │   ├── MovieCard.js   # Movie card with favorite button
│   │   ├── MovieDetails.js # Detailed movie view with cast/trailer
│   │   ├── SearchBar.js   # Search input and filter dropdowns
│   ├── context/           # React Context for state management
│   │   ├── MovieContext.js # Manages search, favorites, user, theme
│   ├── pages/             # Page components
│   │   ├── Home.js        # Home page with trending/search results
│   │   ├── Login.js       # Login page
│   ├── services/          # API service functions
│   │   ├── api.js         # TMDb API calls
│   ├── styles/            # Theme configuration
│   │   ├── theme.js       # MUI theme for light/dark mode
│   ├── App.js             # Main app with routing
│   ├── index.js           # Entry point
├── .env                   # Environment variables (not committed)
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://gitlab.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your TMDb API key (obtain from [themoviedb.org](https://www.themoviedb.org)):
     ```
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

4. **Run Locally**:
   ```bash
   npm start
   ```
   - Opens `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   - Outputs files to the `build/` directory.

6. **Lint Code**:
   ```bash
   npx eslint src
   ```

## API Usage
- **TMDb API**: Powers movie data retrieval.
- **Endpoints**:
  - Trending: `GET /trending/movie/week`
  - Search: `GET /search/movie`
  - Movie Details: `GET /movie/{id}`
  - Cast: `GET /movie/{id}/credits`
  - Genres: `GET /genre/movie/list`
- **API Key**: Stored in `REACT_APP_TMDB_API_KEY` environment variable.
- **Error Handling**: Catches network errors and invalid responses, displaying alerts (e.g., "Search failed. Please check your connection.").

## Deployment
The app is deployed on Netlify with continuous deployment from the `main` branch.


## Testing
- **Local Testing**:
  - Run `npm start` and test:
    - Search for "ben 10", apply filters (Animation, 2005, 6), verify results.
    - Click Reset Search, confirm trending movies load.
    - Refresh after searching, confirm search bar retains query and results load.
    - Add/remove favorites, check `/favorites`.
    - Toggle light/dark mode, verify search box and favorites button visibility.
    - Log in/out, check header updates.
    - Resize browser to test responsive grid (1-column mobile, 4-column desktop).
  - Run `npx eslint src` for code quality.
  - Build locally: `npm run build`.

## Credits
- Built as part of an internship selection process.
- Movie data from [TMDb API](https://www.themoviedb.org).
- UI components from [Material-UI](https://mui.com).