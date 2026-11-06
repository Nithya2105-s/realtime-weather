import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function WeatherDetails({ weather }) {
  if (!weather) return null;

  const details = [
    { title: "Humidity", value: `${weather.main.humidity}%`, icon: "💧" },
    { title: "Wind Speed", value: `${weather.wind.speed} m/s`, icon: "🌬️" },
    { title: "Pressure", value: `${weather.main.pressure} hPa`, icon: "🌡️" },
    { title: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: "👁️" }
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {details.map((item) => (
        <Grid item xs={6} sm={3} key={item.title}>
          <Card className="detail-card">
            <CardContent>
              <Typography variant="h4">{item.icon}</Typography>
              <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
              <Typography variant="h6" color="primary">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
