// Import the express library
const express = require("express");

// Import the routes module
const routes = require("./routes");

// Import the file system module
const fs = require('fs');

// Create an Express application
const app = express();

// Define the port, using environment variable if available, otherwise default to 3001
const PORT = process.env.PORT || 3001;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use(routes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
});