# Realtime Weather App

A React + Vite weather dashboard using Material UI and the OpenWeatherMap API.

## Features
- Search current weather by city
- Current location weather (browser permission required)
- Temperature, feels-like temperature, humidity, wind, pressure and visibility
- Five-day forecast (one noon reading per day when available)
- Recent searches
- Loading and error states

## Setup

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. In the terminal, run:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Add your OpenWeatherMap API key:

   ```env
   VITE_WEATHER_API_KEY=your_actual_api_key
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## API
This project uses the OpenWeatherMap Current Weather and 5-day/3-hour Forecast endpoints:
- `https://openweathermap.org/api`

API keys may take a little time to activate. Never commit your `.env` file to GitHub.

## Production security note
A `VITE_` environment variable is included in the browser bundle and is not secret. For a public production deployment, call OpenWeatherMap through a backend/serverless proxy and keep the API key on the server.
