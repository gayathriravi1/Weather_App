// project-directory/public/app.js

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherDetails = document.getElementById('weatherDetails');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = document.getElementById('submitButton');

    // Disable input and button during fetching
    cityInput.disabled = true;
    submitButton.disabled = true;

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');

    // Clear previous data
    weatherDetails.innerHTML = '';
    errorMessage.innerHTML = '';
    errorMessage.classList.add('hidden');

    try {
        const [data1] = await Promise.all([
            getWeatherData('1', cityInput.value),
            getWeatherData('2', cityInput.value)
        ]);

        // Display data from the first API
        displayWeatherDetails(data1, weatherDetails);

        // Display data from the second API
        //displayWeatherDetails(data2, weatherDetails);
        
        // Provide feedback to the user
        alert('Weather information successfully retrieved!');
    } catch (error) {
        // Display meaningful error message
        errorMessage.innerHTML = `Error: ${error.message}`;
        errorMessage.classList.remove('hidden');
    } finally {
        // Enable input and button
        cityInput.disabled = false;
        submitButton.disabled = false;

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');
    }
}

async function getWeatherData(apiIndex, city) {
    const apiUrl = `/weather/${city}`; // Relative URL, handled by your server

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return await response.json();
}

function displayWeatherDetails(data, element) {
    // Display relevant details such as temperature, weather conditions, etc.
    const details = document.createElement('div');
    details.innerHTML = `
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather Conditions: ${data.weather[0].description}</p>
        <p>Min_Temp: ${data.main.temp_min}°C</p>
        <p>Max_Temp: ${data.main.temp_max}°C</p>
        <p>Feels_Like: ${data.main.feels_like}°C</p>
        <p>Humidity:  ${data.main.humidity}°C</p>
        

        <!-- Add other relevant details -->
    `;
    element.appendChild(details);
}
