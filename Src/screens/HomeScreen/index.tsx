import React, { useEffect, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WeatherCard } from "../../components/weather/WeatherCard";
import { WeatherDetails } from "../../components/weather/WeatherDetails";
import { ForecastList } from "../../components/weather/ForecastList";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { useWeather } from "../../hooks/useWeather";
import { useStorage } from "../../hooks/useStorage";
import { useNavigationInfo } from "../../hooks/useNavigationInfo";
import { colors, spacing } from "../../styles/theme";
import { useTranslation } from "@/Src/hooks/useTranslation";

interface HomeScreenSection {
  id: string;
  type: "weather" | "details" | "forecast" | "error";
  data?: any;
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { tabBarBottomSpace } = useNavigationInfo();
  const t = useTranslation();

  const {
    currentWeather,
    forecast,
    isLoading,
    isRefreshing,
    error,
    temperatureUnit,
    fetchCurrentLocationWeather,
    refreshWeather,
    clearError,
  } = useWeather();

  const { getLastLocation } = useStorage();

  const sections = useMemo((): HomeScreenSection[] => {
    const items: HomeScreenSection[] = [];

    if (error && !currentWeather) {
      items.push({ id: "error", type: "error", data: error });
      return items;
    }

    if (currentWeather) {
      items.push({ id: "weather", type: "weather", data: currentWeather });
      items.push({ id: "details", type: "details", data: currentWeather });

      if (forecast) {
        items.push({ id: "forecast", type: "forecast", data: forecast });
      }
    }

    return items;
  }, [currentWeather, forecast, error]);

  useEffect(() => {
    initializeWeather();
  }, []);

  const initializeWeather = useCallback(async () => {
    try {
      const lastLocation = await getLastLocation();
      await fetchCurrentLocationWeather();
    } catch (err) {
      console.error("Failed to initialize weather:", err);
    }
  }, [fetchCurrentLocationWeather, getLastLocation]);

  const handleRefresh = useCallback(async () => {
    try {
      await refreshWeather();
    } catch (err) {
      Alert.alert(t.refreshFailed, t.unableToRefresh, [{ text: t.ok }]);
    }
  }, [refreshWeather, t]);

  const handleRetry = useCallback(async () => {
    clearError();
    await fetchCurrentLocationWeather();
  }, [clearError, fetchCurrentLocationWeather]);

  const renderSection = useCallback(
    ({ item }: { item: HomeScreenSection }) => {
      switch (item.type) {
        case "weather":
          return (
            <WeatherCard
              weather={item.data}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              temperatureUnit={temperatureUnit}
            />
          );
        case "details":
          return <WeatherDetails weather={item.data} />;
        case "forecast":
          return (
            <ForecastList
              forecast={item.data}
              temperatureUnit={temperatureUnit}
            />
          );
        case "error":
          return (
            <ErrorMessage
              error={item.data}
              onRetry={handleRetry}
              onDismiss={clearError}
              style={styles.errorBanner}
            />
          );
        default:
          return null;
      }
    },
    [handleRefresh, isRefreshing, temperatureUnit, handleRetry, clearError]
  );

  const keyExtractor = useCallback((item: HomeScreenSection) => item.id, []);

  if (isLoading && !currentWeather) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />
        <LoadingSpinner message={t.gettingWeather} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View
        style={{ height: insets.top, backgroundColor: colors.background }}
      />

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.surface}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: tabBarBottomSpace + 80,
          },
        ]}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        initialNumToRender={3}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  errorBanner: {
    margin: spacing.md,
  },
});
