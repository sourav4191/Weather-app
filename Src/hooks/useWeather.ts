import { useCallback } from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import { weatherAPI } from '../services/weatherAPI';
import { locationService } from '../services/locationService';
import { Location } from '../utils/types';
import { TEMPERATURE_UNITS, LANGUAGES } from '../utils/constants';

export function useWeather() {
  const { state, dispatch } = useWeatherContext();

  const fetchWeatherByLocation = useCallback(async (location: Location, showLoading = true) => {
    try {
      if (showLoading) {
        dispatch({ type: 'SET_LOADING', payload: true });
      } else {
        dispatch({ type: 'SET_REFRESHING', payload: true });
      }
      
      dispatch({ type: 'CLEAR_ERROR' });

      const units = TEMPERATURE_UNITS[state.temperatureUnit];
      const language = LANGUAGES[state.language];

      // Fetch current weather and forecast in parallel
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(location, units, language),
        weatherAPI.getForecast(location, units, language)
      ]);

      // Get location name
      const locationName = await locationService.reverseGeocode(location);

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: weatherData });
      dispatch({ type: 'SET_FORECAST', payload: forecastData });
      dispatch({ type: 'SET_LOCATION', payload: { location, name: locationName } });

    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }
  }, [state.temperatureUnit, state.language, dispatch]);

  const fetchWeatherByCity = useCallback(async (cityName: string, showLoading = true) => {
    try {
      if (showLoading) {
        dispatch({ type: 'SET_LOADING', payload: true });
      } else {
        dispatch({ type: 'SET_REFRESHING', payload: true });
      }
      
      dispatch({ type: 'CLEAR_ERROR' });

      const units = TEMPERATURE_UNITS[state.temperatureUnit];
      const language = LANGUAGES[state.language];

      // Fetch current weather and forecast in parallel
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeatherByCity(cityName, units, language),
        weatherAPI.getForecastByCity(cityName, units, language)
      ]);

      const location = {
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon
      };

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: weatherData });
      dispatch({ type: 'SET_FORECAST', payload: forecastData });
      dispatch({ type: 'SET_LOCATION', payload: { location, name: weatherData.name } });
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: cityName });

    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }
  }, [state.temperatureUnit, state.language, dispatch]);

  const fetchCurrentLocationWeather = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        dispatch({ type: 'SET_LOADING', payload: true });
      } else {
        dispatch({ type: 'SET_REFRESHING', payload: true });
      }
      
      dispatch({ type: 'CLEAR_ERROR' });

      const location = await locationService.getCurrentLocation();
      await fetchWeatherByLocation(location, false); // Don't show loading twice

    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error });
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }
  }, [fetchWeatherByLocation, dispatch]);

  const refreshWeather = useCallback(async () => {
    if (state.location) {
      await fetchWeatherByLocation(state.location, false);
    } else {
      await fetchCurrentLocationWeather(false);
    }
  }, [state.location, fetchWeatherByLocation, fetchCurrentLocationWeather]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  const setTemperatureUnit = useCallback((unit: keyof typeof TEMPERATURE_UNITS) => {
    dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: unit });
  }, [dispatch]);

  const setLanguage = useCallback((language: keyof typeof LANGUAGES) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, [dispatch]);

  const addFavoriteCity = useCallback((cityName: string) => {
    dispatch({ type: 'ADD_FAVORITE_CITY', payload: cityName });
  }, [dispatch]);

  const removeFavoriteCity = useCallback((cityName: string) => {
    dispatch({ type: 'REMOVE_FAVORITE_CITY', payload: cityName });
  }, [dispatch]);

  return {
    // State
    ...state,
    
    // Actions
    fetchWeatherByLocation,
    fetchWeatherByCity,
    fetchCurrentLocationWeather,
    refreshWeather,
    clearError,
    setTemperatureUnit,
    setLanguage,
    addFavoriteCity,
    removeFavoriteCity,
  };
}