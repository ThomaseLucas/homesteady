const weatherService = require('../services/weatherService');

//Controller to handle getting weather by zip
const getWeather = async (req, res) => {
    const zipCode = req.query.zip_code;

    if (!zipCode) {
        return res.status(400).json({ message: 'Zip code is required' });
    }

    try {
        const weatherData = await weatherService.getWeatherData(zipCode);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }

};

module.exports = { getWeather };