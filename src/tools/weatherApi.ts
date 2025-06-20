import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

export const getWeatherInfo = async (city: string) => {
    const key = process.env.WEATHER_API_KEY;
    if(!key) {
        throw new Error("WEATHER_API_KEY is not set in the environment variables.");
    }
    console.log(`Fetching weather data for ${city}`);
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`);
    console.log(`Weather data for ${city} fetched successfully.`);
    return response.data;
}