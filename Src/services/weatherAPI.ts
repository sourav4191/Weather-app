import axios, { AxiosResponse } from 'axios';
import { WeatherResponse, ForecastResponse, Location, AppError } from '../utils/types';
import { API_ENDPOINTS, WEATHER_API_KEY, TEMPERATURE_UNITS } from '../utils/constants';

class WeatherAPIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    
    // Setup axios interceptors for error handling
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(this.handleAPIError(error));
      }
    );
  }

  private handleAPIError(error: any): AppError {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          return { 
            message: 'Invalid API key. Please check your configuration.', 
            code: 'INVALID_API_KEY' 
          };
        case 404:
          return { 
            message: 'Location not found. Please check the city name.', 
            code: 'LOCATION_NOT_FOUND' 
          };
        case 429:
          return { 
            message: 'API rate limit exceeded. Please try again later.', 
            code: 'RATE_LIMIT_EXCEEDED' 
          };
        default:
          return { 
            message: data.message || 'Weather service temporarily unavailable.', 
            code: 'API_ERROR' 
          };
      }
    } else if (error.request) {
      // Network error
      return { 
        message: 'Network connection failed. Please check your internet.', 
        code: 'NETWORK_ERROR' 
      };
    } else {
      // Other error
      return { 
        message: 'An unexpected error occurred.', 
        code: 'UNKNOWN_ERROR' 
      };
    }
  }

  async getCurrentWeather(
    location: Location, 
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en'
  ): Promise<WeatherResponse> {
    try {
      const response: AxiosResponse<WeatherResponse> = await axios.get(
        API_ENDPOINTS.CURRENT_WEATHER,
        {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            appid: this.apiKey,
            units,
            lang: language,
          },
          timeout: 10000, // 10 second timeout
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentWeatherByCity(
    cityName: string,
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en'
  ): Promise<WeatherResponse> {
    try {
      const response: AxiosResponse<WeatherResponse> = await axios.get(
        API_ENDPOINTS.CURRENT_WEATHER,
        {
          params: {
            q: cityName,
            appid: this.apiKey,
            units,
            lang: language,
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getForecast(
    location: Location,
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en'
  ): Promise<ForecastResponse> {
    try {
      const response: AxiosResponse<ForecastResponse> = await axios.get(
        API_ENDPOINTS.FORECAST,
        {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            appid: this.apiKey,
            units,
            lang: language,
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getForecastByCity(
    cityName: string,
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en'
  ): Promise<ForecastResponse> {
    try {
      const response: AxiosResponse<ForecastResponse> = await axios.get(
        API_ENDPOINTS.FORECAST,
        {
          params: {
            q: cityName,
            appid: this.apiKey,
            units,
            lang: language,
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const weatherAPI = new WeatherAPIService(WEATHER_API_KEY);