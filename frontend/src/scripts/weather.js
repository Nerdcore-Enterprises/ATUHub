async function getAPIjson(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        return {};
    }
}

export default async function WeatherAPI() {
    const url = 'https://api.weather.gov/points/35.2938,-93.1361';

    let weatherData = {};

    let response = await getAPIjson(url);

    if (response && response.properties && response.properties.forecast) {
        const forecastResponse = await getAPIjson(response.properties.forecast);
        weatherData.periods = forecastResponse.properties.periods;
    } else {
        console.error('Error: Forecast data is not available.');
    }

    return weatherData;
}
