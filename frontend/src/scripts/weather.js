async function getAPIjson(url){
    try{
        // Get weather info
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (error){
        console.error(error.message);
        return null
    }
}

export default async function WeatherAPI(){
    const url = 'https://api.weather.gov/points/35.2938,-93.1361';

    let weatherData = {};

    let response = await getAPIjson(url);

    weatherData.periods = await getAPIjson(response.properties.forecast).then(x => {
        return x.properties.periods;
    });

    let radarUrl = `https://radar.weather.gov/ridge/standard/${response.properties.radarStation}_loop.gif`;

    // CORS error here, need backend fix
    //weatherData.radar = await fetch(radarUrl);

    console.log(response);

    return weatherData;
}