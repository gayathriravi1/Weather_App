// project-directory/server/server.js

const express = require('express');
const fetch = require('node-fetch');
const config = require('./config');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/weather/:city', async (req, res) => {
    const { city } = req.params;
    const openWeatherMapApiKey = config.openWeatherMapApiKey;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
