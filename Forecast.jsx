import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function Forecast({ forecast }) {
  if (!forecast?.list) return null;

  // OpenWeatherMap provides forecasts in 3-hour intervals.
  // Use the entry closest to 12:00 for each local forecast date.
  const byDate = new Map();
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const hour = Number(item.dt_txt.slice(11, 13));
    const current = byDate.get(date);
    if (!current || Math.abs(hour - 12) < Math.abs(current.hour - 12)) {
      byDate.set(date, { item, hour });
    }
  });
  const dailyForecast = [...byDate.values()].slice(0, 5).map(({ item }) => item);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mt={5} mb={2}>
        5-Day Weather Forecast
      </Typography>
      <Grid container spacing={2}>
        {dailyForecast.map((day) => (
          <Grid item xs={6} sm={4} md key={day.dt}>
            <Card className="forecast-card">
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {new Date(`${day.dt_txt.replace(" ", "T")}Z`).toLocaleDateString("en-IN", {
                    weekday: "short", day: "numeric", month: "short"
                  })}
                </Typography>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  width="75"
                  height="75"
                />
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {Math.round(day.main.temp)}°C
                </Typography>
                <Typography variant="body2" textTransform="capitalize">
                  {day.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
