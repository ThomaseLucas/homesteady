// Import the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the weather controller
const weatherController = require('../controllers/weatherController');

//route to get weather data by zip code
router.get('/get_weather', weatherController.getWeather);

// Export the router
module.exports = router;