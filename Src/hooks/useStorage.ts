import { useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWeatherContext } from '../context/WeatherContext';
import { STORAGE_KEYS } from '../utils/constants';
import { Location } from '../utils/types';

export function useStorage() {
  const { state, dispatch } = useWeatherContext();

  // Load data from storage on app start
  useEffect(() => {
    loadStorageData();
  }, []);

  // Save data when state changes
  useEffect(() => {
    saveStorageData();
  }, [state.temperatureUnit, state.language, state.favoriteCities, state.searchHistory]);

  const loadStorageData = useCallback(async () => {
    try {
      const [temperatureUnit, language, favoriteCities, searchHistory] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TEMPERATURE_UNIT),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_CITIES),
        AsyncStorage.getItem(STORAGE_KEYS.LAST_LOCATION),
      ]);

      if (temperatureUnit) {
        dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: JSON.parse(temperatureUnit) });
      }

      if (language) {
        dispatch({ type: 'SET_LANGUAGE', payload: JSON.parse(language) });
      }

      if (favoriteCities) {
        const cities = JSON.parse(favoriteCities);
        cities.forEach((city: string) => {
          dispatch({ type: 'ADD_FAVORITE_CITY', payload: city });
        });
      }

    } catch (error) {
      console.error('Error loading storage data:', error);
    }
  }, [dispatch]);

  const saveStorageData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TEMPERATURE_UNIT, JSON.stringify(state.temperatureUnit)),
        AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(state.language)),
        AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(state.favoriteCities)),
      ]);
    } catch (error) {
      console.error('Error saving storage data:', error);
    }
  }, [state.temperatureUnit, state.language, state.favoriteCities]);

  const saveLastLocation = useCallback(async (location: Location) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
    } catch (error) {
      console.error('Error saving last location:', error);
    }
  }, []);

  const getLastLocation = useCallback(async (): Promise<Location | null> => {
    try {
      const lastLocation = await AsyncStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return lastLocation ? JSON.parse(lastLocation) : null;
    } catch (error) {
      console.error('Error getting last location:', error);
      return null;
    }
  }, []);

  return {
    saveLastLocation,
    getLastLocation,
  };
}