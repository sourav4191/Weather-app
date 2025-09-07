// components/weather/ForecastList.tsx - FIXED to show proper 5-day forecast
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ForecastResponse, ForecastItem } from "../../../utils/types";
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from "../../../styles/theme";
import { WEATHER_ICONS } from "../../../utils/constants";
import { useTranslation } from "@/Src/hooks/useTranslation";

interface ForecastListProps {
  forecast: ForecastResponse;
  temperatureUnit: string;
}

interface DailyForecast {
  date: string;
  dayName: string;
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
  humidity: number;
}

function ForecastItemComponent({
  item,
  temperatureUnit,
  t,
}: {
  item: ForecastItem;
  temperatureUnit: string;
  t: any;
}) {
  const getTemperatureSymbol = () => {
    switch (temperatureUnit) {
      case "CELSIUS":
        return "°C";
      case "FAHRENHEIT":
        return "°F";
      case "KELVIN":
        return "K";
      default:
        return "°C";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return t.today;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t.tomorrow;
    } else {
      return date.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const weatherIcon = WEATHER_ICONS[item.weather[0].icon] || "🌤️";

  return (
    <View style={forecastStyles.item}>
      <View style={forecastStyles.timeContainer}>
        <Text style={forecastStyles.date}>{formatDate(item.dt_txt)}</Text>
        <Text style={forecastStyles.time}>{formatTime(item.dt_txt)}</Text>
      </View>

      <View style={forecastStyles.weatherContainer}>
        <Text style={forecastStyles.icon}>{weatherIcon}</Text>
        <Text style={forecastStyles.description}>
          {item.weather[0].description.charAt(0).toUpperCase() +
            item.weather[0].description.slice(1)}
        </Text>
      </View>

      <View style={forecastStyles.tempContainer}>
        <Text style={forecastStyles.temp}>
          {Math.round(item.main.temp)}
          {getTemperatureSymbol()}
        </Text>
        <Text style={forecastStyles.humidity}>{item.main.humidity}% 💧</Text>
      </View>
    </View>
  );
}

function DailyForecastComponent({
  item,
  temperatureUnit,
  t,
}: {
  item: DailyForecast;
  temperatureUnit: string;
  t: any;
}) {
  const getTemperatureSymbol = () => {
    switch (temperatureUnit) {
      case "CELSIUS":
        return "°C";
      case "FAHRENHEIT":
        return "°F";
      case "KELVIN":
        return "K";
      default:
        return "°C";
    }
  };

  return (
    <View style={forecastStyles.dailyItem}>
      <View style={forecastStyles.dailyDateContainer}>
        <Text style={forecastStyles.dailyDay}>{item.dayName}</Text>
        <Text style={forecastStyles.dailyDate}>{item.date}</Text>
      </View>

      <View style={forecastStyles.dailyWeatherContainer}>
        <Text style={forecastStyles.dailyIcon}>{item.icon}</Text>
        <Text style={forecastStyles.dailyDescription}>{item.description}</Text>
      </View>

      <View style={forecastStyles.dailyTempContainer}>
        <Text style={forecastStyles.dailyMaxTemp}>
          {t.high}: {Math.round(item.maxTemp)}
          {getTemperatureSymbol()}
        </Text>
        <Text style={forecastStyles.dailyMinTemp}>
          {t.low}: {Math.round(item.minTemp)}
          {getTemperatureSymbol()}
        </Text>
      </View>
    </View>
  );
}

export function ForecastList({ forecast, temperatureUnit }: ForecastListProps) {
  const t = useTranslation();

  const getDailyForecast = (): DailyForecast[] => {
    const dailyData: { [date: string]: ForecastItem[] } = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt_txt).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    const dailyForecasts: DailyForecast[] = [];
    const sortedDates = Object.keys(dailyData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    sortedDates.slice(0, 5).forEach((dateString) => {
      const dayItems = dailyData[dateString];
      const date = new Date(dateString);

      const weatherCounts: { [key: string]: number } = {};
      dayItems.forEach((item) => {
        const weather = item.weather[0].main;
        weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
      });

      const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) =>
        weatherCounts[a] > weatherCounts[b] ? a : b
      );

      const representativeItem =
        dayItems.find((item) => item.weather[0].main === mostCommonWeather) ||
        dayItems[0];

      const temps = dayItems.map((item) => item.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);

      const avgHumidity = Math.round(
        dayItems.reduce((sum, item) => sum + item.main.humidity, 0) /
          dayItems.length
      );

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      let dayName: string;
      if (date.toDateString() === today.toDateString()) {
        dayName = t.today;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        dayName = t.tomorrow;
      } else {
        dayName = date.toLocaleDateString([], { weekday: "short" });
      }

      dailyForecasts.push({
        date: date.toLocaleDateString([], { month: "short", day: "numeric" }),
        dayName,
        icon: WEATHER_ICONS[representativeItem.weather[0].icon] || "🌤️",
        description:
          representativeItem.weather[0].description.charAt(0).toUpperCase() +
          representativeItem.weather[0].description.slice(1),
        maxTemp,
        minTemp,
        humidity: avgHumidity,
      });
    });

    return dailyForecasts;
  };

  const dailyForecast = getDailyForecast();
  const hourlyForecast = forecast.list.slice(0, 8);

  return (
    <View style={forecastStyles.container}>
      <Text style={forecastStyles.title}>{t.forecast5Day}</Text>
      <View style={forecastStyles.dailyContainer}>
        {dailyForecast.map((item, index) => (
          <DailyForecastComponent
            key={`daily-${index}`}
            item={item}
            temperatureUnit={temperatureUnit}
            t={t}
          />
        ))}
      </View>

      <Text style={[forecastStyles.title, { marginTop: spacing.xl }]}>
        {t.hourlyForecast}
      </Text>
      <View style={forecastStyles.hourlyContainer}>
        {hourlyForecast.map((item, index) => (
          <ForecastItemComponent
            key={`hourly-${item.dt}-${index}`}
            item={item}
            temperatureUnit={temperatureUnit}
            t={t}
          />
        ))}
      </View>
    </View>
  );
}

const forecastStyles = StyleSheet.create({
  container: {
    margin: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  dailyContainer: {
    marginBottom: spacing.lg,
  },
  dailyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  dailyDateContainer: {
    flex: 1,
  },
  dailyDay: {
    ...typography.body1,
    color: colors.text,
    fontWeight: "600",
  },
  dailyDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dailyWeatherContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  dailyIcon: {
    fontSize: 32,
    marginRight: spacing.sm,
  },
  dailyDescription: {
    ...typography.body2,
    color: colors.text,
    flex: 1,
  },
  dailyTempContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  dailyMaxTemp: {
    ...typography.body1,
    color: colors.text,
    fontWeight: "bold",
  },
  dailyMinTemp: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  hourlyContainer: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  timeContainer: {
    flex: 1,
  },
  date: {
    ...typography.body2,
    color: colors.text,
    fontWeight: "600",
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  weatherContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  description: {
    ...typography.caption,
    color: colors.text,
    flex: 1,
  },
  tempContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  temp: {
    ...typography.body2,
    color: colors.text,
    fontWeight: "bold",
  },
  humidity: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
});
