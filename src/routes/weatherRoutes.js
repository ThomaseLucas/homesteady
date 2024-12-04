// Import the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the weather controller
const weatherController = require('../controllers/weatherController');

//route to get weather data by zip code
router.get('/get_weather', weatherController.getWeather);

//Route to get coordinates from a zip code
router.get('/get_coordinates', weatherController.getCoordinates);

//Route to get historical data
router.get('/get_historical_weather', weatherController.getHistoricalWeather);

// Export the router
module.exports = router;