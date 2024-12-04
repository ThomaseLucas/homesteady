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

const getCoordinates = async (req, res) => {
    const zipCode = req.query.zip_code;

    if (!zipCode) {
        return res.status(400).json({ message: 'Zip code is required' });
    }

    try {
        const { latitude, longitude } = await weatherService.getCoordinates(zipCode);
        res.json({ latitude, longitude });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching coordinates' });
    }
};

const getHistoricalWeather = async (req, res) => {
    const {latitude, longitude} = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'latitude and longitude is required' });
    }

    try {
        //Get historical weather data
        const historicalData = await weatherService.getHistoricalWeatherData(latitude, longitude);

        console.log(historicalData);

        if (!weatherData || !weatherData.avgTemp) {
            return res.status(500).json({ message: 'Error: Temperature data not found' });
        }

        res.json(historicalData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching historical weather data' });
    }
};

module.exports = { getWeather, getHistoricalWeather, getCoordinates };