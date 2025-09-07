import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { WeatherResponse, ForecastResponse, Location, AppError } from '../utils/types';
import { TEMPERATURE_UNITS, LANGUAGES } from '../utils/constants';

interface WeatherState {
  // Data
  currentWeather: WeatherResponse | null;
  forecast: ForecastResponse | null;
  location: Location | null;
  locationName: string;
  
  // UI State
  isLoading: boolean;
  isRefreshing: boolean;
  error: AppError | null;
  
  // Settings
  temperatureUnit: keyof typeof TEMPERATURE_UNITS;
  language: keyof typeof LANGUAGES;
  
  // Search
  searchHistory: string[];
  favoriteCities: string[];
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_CURRENT_WEATHER'; payload: WeatherResponse }
  | { type: 'SET_FORECAST'; payload: ForecastResponse }
  | { type: 'SET_LOCATION'; payload: { location: Location; name: string } }
  | { type: 'SET_TEMPERATURE_UNIT'; payload: keyof typeof TEMPERATURE_UNITS }
  | { type: 'SET_LANGUAGE'; payload: keyof typeof LANGUAGES }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: string }
  | { type: 'ADD_FAVORITE_CITY'; payload: string }
  | { type: 'REMOVE_FAVORITE_CITY'; payload: string }
  | { type: 'CLEAR_ERROR' };

interface WeatherContextType {
  state: WeatherState;
  dispatch: React.Dispatch<WeatherAction>;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  location: null,
  locationName: '',
  isLoading: false,
  isRefreshing: false,
  error: null,
  temperatureUnit: 'CELSIUS',
  language: 'EN',
  searchHistory: [],
  favoriteCities: [],
};

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_REFRESHING':
      return { ...state, isRefreshing: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false, isRefreshing: false };
    
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload, error: null };
    
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload, error: null };
    
    case 'SET_LOCATION':
      return { 
        ...state, 
        location: action.payload.location,
        locationName: action.payload.name 
      };
    
    case 'SET_TEMPERATURE_UNIT':
      return { ...state, temperatureUnit: action.payload };
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'ADD_TO_SEARCH_HISTORY':
      const newHistory = [action.payload, ...state.searchHistory.filter(item => item !== action.payload)];
      return { 
        ...state, 
        searchHistory: newHistory.slice(0, 10) // Keep only last 10 searches
      };
    
    case 'ADD_FAVORITE_CITY':
      if (state.favoriteCities.includes(action.payload)) {
        return state;
      }
      return { 
        ...state, 
        favoriteCities: [...state.favoriteCities, action.payload] 
      };
    
    case 'REMOVE_FAVORITE_CITY':
      return { 
        ...state, 
        favoriteCities: state.favoriteCities.filter(city => city !== action.payload) 
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
}