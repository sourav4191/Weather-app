import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { WeatherProvider } from "./Src/context/WeatherContext";
import { ErrorBoundary } from "./Src/components/common/ErrorBoundary";
import { AppNavigator, navigationTheme } from "./Src/navigation";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary>
        <WeatherProvider>
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
        </WeatherProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
