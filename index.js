// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");

// Define the API URL using environment variables
const apiUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

// Set the PORT for the server
const PORT = process.env.PORT || 5050;

// Enable CORS for all routes
app.use(cors());

// Serve static images from the "public/images" directory
app.use(express.static("public/images"));

// Custom middleware function for logging
app.use(middleware);

// Parse incoming JSON requests
app.use(express.json());

// Custom middleware function for logging date and URL
function middleware(req, _res, next) {
  console.log(new Date().toLocaleDateString());
  console.log(req.url);
  next();
}

// Import and use video-related routes
const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

// Default route for all other paths
app.use("/", (_req, res) => {
  res.send("you are hitting the server");
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`listening on post ${apiUrl}`);
});
