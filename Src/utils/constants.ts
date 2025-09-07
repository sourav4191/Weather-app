export const WEATHER_API_KEY = '8b263b6371f464e54e4dfd1e27376da2';
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const API_ENDPOINTS = {
  CURRENT_WEATHER: `${WEATHER_BASE_URL}/weather`,
  FORECAST: `${WEATHER_BASE_URL}/forecast`,
};

export const STORAGE_KEYS = {
  LAST_LOCATION: 'lastLocation',
  FAVORITE_CITIES: 'favoriteCities',
  TEMPERATURE_UNIT: 'temperatureUnit',
  LANGUAGE: 'language',
};

export const TEMPERATURE_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
  KELVIN: 'standard',
} as const;

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
} as const;

export const WEATHER_ICONS: { [key: string]: string } = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌧️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️',
};