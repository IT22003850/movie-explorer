import { useState, useContext } from 'react'; // Importing hooks for state and context
import { useNavigate } from 'react-router-dom'; // Importing the navigate hook for page redirection
import { TextField, Button, Box, Typography, Container } from '@mui/material'; // Importing MUI components
import { MovieContext } from '../context/MovieContext'; // Importing MovieContext to handle user login

function Login() {
  // Defining state variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Using navigate hook to redirect users after successful login
  const navigate = useNavigate();
  
  // Extracting login function from the MovieContext
  const { login } = useContext(MovieContext);

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    // Attempting to login using the login function from context
    if (login(username, password)) {
      // If login is successful, redirecting to the home page
      navigate('/home');
    } else {
      // If login fails, setting an error message
      setError('Please fill in all fields');
    }
  };

  return (
    <Container maxWidth="sm"> {/* Container to center the form */}
      <Box sx={{ mt: 8, textAlign: 'center' }}> {/* Styling the box to align the form */}
        <Typography variant="h4" gutterBottom> {/* Displaying the title */}
          Movie Explorer
        </Typography>
        <form onSubmit={handleSubmit}> {/* Form to handle user input */}
          <TextField
            label="Username" // Label for the username input field
            fullWidth // Makes the input field full width
            margin="normal" // Applies standard margin
            value={username} // Setting the value of the input to the username state
            onChange={(e) => setUsername(e.target.value)} // Updates username state on input change
          />
          <TextField
            label="Password" // Label for the password input field
            type="password" // Hides the password input
            fullWidth // Makes the input field full width
            margin="normal" // Applies standard margin
            value={password} // Setting the value of the input to the password state
            onChange={(e) => setPassword(e.target.value)} // Updates password state on input change
          />
          {error && (
            <Typography color="error" variant="body2"> {/* Conditionally rendering error message */}
              {error}
            </Typography>
          )}
          <Button
            type="submit" // Submits the form
            variant="contained" // MUI contained button style
            fullWidth // Makes the button full width
            sx={{ mt: 2 }} // Adds margin to the top of the button
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
