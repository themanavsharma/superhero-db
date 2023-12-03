// server/server.js

// Import necessary modules and libraries
const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create an instance of the Express application
const app = express();
// Set the port for the server to run on, using the environment variable PORT or default to 3001
const PORT = process.env.PORT || 3001;

// Connect to your MongoDB database (replace 'your_database_uri' with your actual MongoDB URI)
mongoose.connect('your_database_uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Express to use body-parser for parsing incoming request bodies and sessions for user authentication
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Define the User model using Mongoose schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  nickname: String,
  disabled: Boolean,
});

// Plugin Passport-Local Mongoose to simplify handling local authentication
UserSchema.plugin(passportLocalMongoose);

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

// Configure Passport local strategy using Passport-Local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve static assets (e.g., CSS, JS, images) from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/my-react-app/build')));




// Registration endpoint for handling user sign-up requests
app.post('/api/signup', async (req, res) => {
  const { email, password, nickname } = req.body;

  try {
    // Register a new user using Passport-Local Mongoose
    const user = await User.register(new User({ email, nickname }), password);

    // Optionally, send a verification email here if needed

    // Respond with a success message if registration is successful
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    // Handle registration failure and respond with an error message
    res.status(500).json({ error: 'Registration failed' });
  }
});




// Login endpoint for handling user login requests
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful, respond with a success message
  res.json({ message: 'Login successful' });
});




// Logout endpoint for logging out authenticated users
app.get('/api/logout', (req, res) => {
  req.logout(); // Passport method to log out the user
  res.json({ message: 'Logout successful' });
});




// Example protected route, accessible only to authenticated users
app.get('/api/protected', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, respond with a success message
    res.json({ message: 'You are authenticated' });
  } else {
    // User is not authenticated, respond with an authentication error
    res.status(401).json({ error: 'Authentication required' });
  }
});




// Handle other routes by serving the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/my-react-app/build', 'index.html'));
});




// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
