function fetchWeatherData() {
    const zipCode = document.getElementById("zipCode").value;

    // Check if zipCode is provided
    if (!zipCode) {
      alert("Please enter a zip code");
      return;
    }

    // Fetch current weather data
    fetch(`/api/weather/get_weather?zip_code=${zipCode}`)
      .then((response) => response.json())
      .then((weatherData) => {
        const weatherContainer =
          document.getElementById("weather-container");
        weatherContainer.innerHTML = `
          <h2>Weather Info</h2>
          <h2>Current Weather for ${weatherData.name}</h2>
          <p>Temperature: ${weatherData.main.temp_farenheit}°F</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
        `;
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
        const weatherContainer =
          document.getElementById("weather-container");
        weatherContainer.innerHTML = `<p>Error fetching weather data</p>`;
      });
  }