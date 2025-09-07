import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useWeather } from "../../hooks/useWeather";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { colors, typography, spacing, borderRadius } from "../../styles/theme";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigationInfo } from "@/Src/hooks/useNavigationInfo";

export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { tabBarBottomSpace } = useNavigationInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    searchHistory,
    favoriteCities,
    isLoading,
    error,
    fetchWeatherByCity,
    addFavoriteCity,
    removeFavoriteCity,
    clearError,
  } = useWeather();

  const handleSearch = useCallback(
    async (cityName: string) => {
      if (!cityName.trim()) {
        Alert.alert("Invalid Input", "Please enter a city name");
        return;
      }

      setIsSearching(true);
      try {
        await fetchWeatherByCity(cityName.trim());
        setSearchQuery("");
        Alert.alert("Success", `Weather data loaded for ${cityName}`);
      } catch (error) {
        Alert.alert(
          "Search Failed",
          "City not found or network error. Please try again.",
          [{ text: "OK" }]
        );
      } finally {
        setIsSearching(false);
      }
    },
    [fetchWeatherByCity]
  );

  const handleFavoriteToggle = useCallback(
    (cityName: string) => {
      if (favoriteCities.includes(cityName)) {
        removeFavoriteCity(cityName);
      } else {
        addFavoriteCity(cityName);
      }
    },
    [favoriteCities, addFavoriteCity, removeFavoriteCity]
  );

  const renderCityItem = ({ item }: { item: string }) => (
    <View style={searchStyles.cityItem}>
      <TouchableOpacity
        style={searchStyles.cityButton}
        onPress={() => handleSearch(item)}
      >
        <Text style={searchStyles.cityName}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={searchStyles.favoriteButton}
        onPress={() => handleFavoriteToggle(item)}
      >
        <Text style={searchStyles.favoriteIcon}>
          {favoriteCities.includes(item) ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading || isSearching) {
    return (
      <View style={[searchStyles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />
        <LoadingSpinner message="Searching for weather..." />
      </View>
    );
  }

  return (
    <View style={searchStyles.container}>
      <StatusBar style="light" />

      {/* Status bar safe area */}
      <View
        style={{ height: insets.top, backgroundColor: colors.background }}
      />

      <View style={searchStyles.header}>
        <Text style={searchStyles.title}>Search Weather</Text>
      </View>

      <View style={searchStyles.searchContainer}>
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Enter city name..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={searchStyles.searchButton}
          onPress={() => handleSearch(searchQuery)}
          disabled={!searchQuery.trim()}
        >
          <Text style={searchStyles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <ErrorMessage
          error={error}
          onDismiss={clearError}
          style={searchStyles.error}
        />
      )}

      <FlatList
        data={[
          ...(favoriteCities.length > 0
            ? [
                {
                  type: "header",
                  title: "Favorite Cities",
                  data: favoriteCities,
                },
              ]
            : []),
          ...(searchHistory.length > 0
            ? [
                {
                  type: "header",
                  title: "Recent Searches",
                  data: searchHistory,
                },
              ]
            : []),
        ]}
        renderItem={({ item }) => (
          <View style={searchStyles.section}>
            <Text style={searchStyles.sectionTitle}>{item.title}</Text>
            {item.data.map((city: string) => (
              <View key={city} style={searchStyles.cityItem}>
                <TouchableOpacity
                  style={searchStyles.cityButton}
                  onPress={() => handleSearch(city)}
                >
                  <Text style={searchStyles.cityName}>{city}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={searchStyles.favoriteButton}
                  onPress={() => handleFavoriteToggle(city)}
                >
                  <Text style={searchStyles.favoriteIcon}>
                    {favoriteCities.includes(city) ? "❤️" : "🤍"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={[
          searchStyles.contentContainer,
          { paddingBottom: tabBarBottomSpace + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    margin: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchButton: {
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 20,
  },
  error: {
    margin: spacing.md,
  },
  section: {
    margin: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
  },
  cityButton: {
    flex: 1,
    padding: spacing.md,
  },
  cityName: {
    ...typography.body1,
    color: colors.text,
  },
  favoriteButton: {
    padding: spacing.md,
  },
  favoriteIcon: {
    fontSize: 20,
  },
});
