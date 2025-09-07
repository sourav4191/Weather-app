import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherResponse } from '../../../utils/types';
import { colors, typography, spacing, borderRadius } from '../../../styles/theme';
import { WEATHER_ICONS } from '../../../utils/constants';

interface WeatherCardProps {
  weather: WeatherResponse;
  onRefresh: () => void;
  isRefreshing: boolean;
  temperatureUnit: string;
}

export function WeatherCard({ 
  weather, 
  onRefresh, 
  isRefreshing, 
  temperatureUnit 
}: WeatherCardProps) {
  const getTemperatureSymbol = () => {
    switch (temperatureUnit) {
      case 'CELSIUS': return '°C';
      case 'FAHRENHEIT': return '°F';
      case 'KELVIN': return 'K';
      default: return '°C';
    }
  };

  const formatTemperature = (temp: number) => {
    return Math.round(temp);
  };

  const weatherIcon = WEATHER_ICONS[weather.weather[0].icon] || '🌤️';

  return (
    <LinearGradient
      colors={[colors.gradient.start, colors.gradient.end]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>{weather.name}</Text>
          <Text style={styles.country}>{weather.sys.country}</Text>
        </View>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={isRefreshing}
        >
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainWeather}>
        <Text style={styles.weatherIcon}>{weatherIcon}</Text>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>
            {formatTemperature(weather.main.temp)}{getTemperatureSymbol()}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {formatTemperature(weather.main.feels_like)}{getTemperatureSymbol()}
          </Text>
        </View>
      </View>

      <View style={styles.description}>
        <Text style={styles.weatherDescription}>
          {weather.weather[0].description.charAt(0).toUpperCase() + 
           weather.weather[0].description.slice(1)}
        </Text>
        <Text style={styles.tempRange}>
          H: {formatTemperature(weather.main.temp_max)}{getTemperatureSymbol()} · 
          L: {formatTemperature(weather.main.temp_min)}{getTemperatureSymbol()}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    margin: spacing.md,
    minHeight: 280,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  location: {
    ...typography.h2,
    color: colors.text,
    fontWeight: 'bold',
  },
  country: {
    ...typography.body1,
    color: colors.text,
    opacity: 0.8,
  },
  refreshButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  refreshIcon: {
    fontSize: 20,
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  weatherIcon: {
    fontSize: 80,
  },
  temperatureContainer: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: 80,
  },
  feelsLike: {
    ...typography.body1,
    color: colors.text,
    opacity: 0.8,
  },
  description: {
    alignItems: 'center',
  },
  weatherDescription: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tempRange: {
    ...typography.body1,
    color: colors.text,
    opacity: 0.8,
  },
});