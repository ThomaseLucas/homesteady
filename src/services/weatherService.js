const axios = require('axios');

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

module.exports = { getWeatherData };