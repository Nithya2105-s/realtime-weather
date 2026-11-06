import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  async function fetchWeather(url, searchLabel) {
    if (!API_KEY) {
      setError("API key is missing. Add VITE_WEATHER_API_KEY to your .env file.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const weatherResponse = await fetch(url);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || "Unable to find weather for that location.");
      }

      const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}&units=metric`;

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (!forecastResponse.ok) {
        throw new Error(forecastData.message || "Unable to load the forecast.");
      }

      setWeather(weatherData);
      setForecast(forecastData);
      setHistory((previous) => [
        weatherData.name,
        ...previous.filter((name) => name.toLowerCase() !== weatherData.name.toLowerCase())
      ].slice(0, 5));
      if (searchLabel) setCity(searchLabel === "Current Location" ? "" : searchLabel);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`;
    fetchWeather(url, trimmedCity);
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const url =
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
        fetchWeather(url, "Current Location");
      },
      () => {
        setLoading(false);
        setError("Location permission was denied or your location is unavailable.");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  function searchHistoryItem(name) {
    setCity(name);
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=${API_KEY}&units=metric`;
    fetchWeather(url, name);
  }

  return (
    <Container maxWidth="lg">
      <Box className="weather-container">
        <Typography variant="h3" component="h1" fontWeight={800} textAlign="center" mb={1}>
          🌤️ Weather Forecast
        </Typography>
        <Typography textAlign="center" mb={4}>
          Get real-time weather information around the world
        </Typography>

        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        <Box textAlign="center" mb={3}>
          <Button variant="outlined" startIcon={<MyLocationIcon />} onClick={getCurrentLocation}>
            Use My Current Location
          </Button>
        </Box>

        {loading && (
          <Box textAlign="center" my={4}>
            <CircularProgress />
            <Typography mt={1}>Loading weather...</Typography>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast forecast={forecast} />
          </>
        )}

        {history.length > 0 && (
          <Box mt={5}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Recent Searches</Typography>
            {history.map((name) => (
              <Button
                key={name}
                variant="outlined"
                size="small"
                sx={{ mr: 1, mb: 1 }}
                onClick={() => searchHistoryItem(name)}
              >
                {name}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
