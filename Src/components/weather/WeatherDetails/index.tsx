import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherResponse } from "../../../utils/types";
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from "../../../styles/theme";
import { useTranslation } from "@/Src/hooks/useTranslation";

interface WeatherDetailsProps {
  weather: WeatherResponse;
}

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <View style={detailStyles.item}>
      <Text style={detailStyles.icon}>{icon}</Text>
      <View style={detailStyles.textContainer}>
        <Text style={detailStyles.label}>{label}</Text>
        <Text style={detailStyles.value}>{value}</Text>
      </View>
    </View>
  );
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const t = useTranslation();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatVisibility = (visibility: number) => {
    return `${(visibility / 1000).toFixed(1)} km`;
  };

  const formatPressure = (pressure: number) => {
    return `${pressure} hPa`;
  };

  const formatWindSpeed = (speed: number) => {
    return `${speed} m/s`;
  };

  const formatWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const weatherDetails = [
    {
      icon: "💧",
      label: t.humidity,
      value: `${weather.main.humidity}%`,
    },
    {
      icon: "💨",
      label: t.wind,
      value: `${formatWindSpeed(weather.wind.speed)} ${formatWindDirection(
        weather.wind.deg
      )}`,
    },
    {
      icon: "👁️",
      label: t.visibility,
      value: formatVisibility(weather.visibility),
    },
    {
      icon: "🌡️",
      label: t.pressure,
      value: formatPressure(weather.main.pressure),
    },
    {
      icon: "🌅",
      label: t.sunrise,
      value: formatTime(weather.sys.sunrise),
    },
    {
      icon: "🌇",
      label: t.sunset,
      value: formatTime(weather.sys.sunset),
    },
  ];

  const detailPairs = [];
  for (let i = 0; i < weatherDetails.length; i += 2) {
    detailPairs.push(weatherDetails.slice(i, i + 2));
  }

  return (
    <View style={detailStyles.container}>
      <Text style={detailStyles.title}>{t.weatherDetails}</Text>
      <View style={detailStyles.grid}>
        {detailPairs.map((pair, rowIndex) => (
          <View key={rowIndex} style={detailStyles.row}>
            {pair.map((detail, colIndex) => (
              <DetailItem
                key={`${rowIndex}-${colIndex}`}
                icon={detail.icon}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const detailStyles = StyleSheet.create({
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
  grid: {
    // Grid container
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    ...typography.body2,
    color: colors.text,
    fontWeight: "600",
  },
});
