const axios = require('axios');

//Service to get weather data from the OpenWeatherMap API
const getCoordinates = async (zipCode) => {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?postalcode=${zipCode}&lang=en`;

    try {
        const response = await axios.get(geocodeUrl);
        const data = await response.data;
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        return {latitude, longitude};
    } catch (error) {
        throw new Error('Error fetching coordinates');
    }
};

//Service to get historical weather data from the Open Meteo API
const getHistoricalWeatherData = async (latitude, longitude) => {
    const startDate = '2023-1-1';
    const endDate = '2024-1-1';

    const weatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;

        //Calculate the average temperature
        const temperatures = data.hourly.temperature_2m;
        const avgTemp = temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length;

        return {avgTemp};
    } catch (error) {
        throw new Error('Error fetching historical weather data');
    }
};


//Function to get weather data from the OpenWeatherMap API
const getWeatherData = async (zipCode) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;

        //Convert from kelvin to fahrenheit
        const kelvinTemp = data.main.temp;
        const farenheitTemp = (kelvinTemp - 273.15) * 9 / 5 + 32;

        //Update the data object with the farhenheit temperature
        data.main.temp_farenheit = farenheitTemp.toFixed(2);

        return data; //REturn the updated data object

    } catch (error) {
        throw new Error('Error fetching weather data');
    }
};

module.exports = { getWeatherData, getCoordinates, getHistoricalWeatherData };