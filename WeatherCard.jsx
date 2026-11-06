import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <Card className="current-weather-card">
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          {weather.name}, {weather.sys.country}
        </Typography>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          width="120"
          height="120"
        />
        <Typography variant="h2" color="primary" fontWeight="bold">
          {Math.round(weather.main.temp)}°C
        </Typography>
        <Typography variant="h6" textTransform="capitalize">
          {weather.weather[0].description}
        </Typography>
        <Typography mt={1}>
          Feels like {Math.round(weather.main.feels_like)}°C
        </Typography>
      </CardContent>
    </Card>
  );
}
