import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeather } from "../../hooks/useWeather";
import { useNavigationInfo } from "../../hooks/useNavigationInfo";
import { colors, typography, spacing, borderRadius } from "../../styles/theme";
import { TEMPERATURE_UNITS, LANGUAGES } from "../../utils/constants";
import { useTranslation } from "@/Src/hooks/useTranslation";

interface SettingItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}

function SettingItem({
  title,
  subtitle,
  onPress,
  rightElement,
  disabled = false,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={[settingStyles.item, disabled && settingStyles.disabled]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={settingStyles.itemContent}>
        <Text style={settingStyles.itemTitle}>{title}</Text>
        {subtitle && <Text style={settingStyles.itemSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement && (
        <View style={settingStyles.itemRight}>{rightElement}</View>
      )}
    </TouchableOpacity>
  );
}

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { tabBarBottomSpace } = useNavigationInfo();
  const t = useTranslation();

  const {
    temperatureUnit,
    language,
    favoriteCities,
    setTemperatureUnit,
    setLanguage,
    fetchCurrentLocationWeather,
  } = useWeather();

  const handleTemperatureUnitChange = () => {
    const units = Object.keys(
      TEMPERATURE_UNITS
    ) as (keyof typeof TEMPERATURE_UNITS)[];
    const currentIndex = units.indexOf(temperatureUnit);
    const nextIndex = (currentIndex + 1) % units.length;
    const nextUnit = units[nextIndex];

    setTemperatureUnit(nextUnit);

    setTimeout(() => {
      fetchCurrentLocationWeather(false);
    }, 100);
  };

  const handleLanguageChange = () => {
    const languages = Object.keys(LANGUAGES) as (keyof typeof LANGUAGES)[];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setLanguage(nextLanguage);

    setTimeout(() => {
      fetchCurrentLocationWeather(false);
    }, 100);
  };

  const getTemperatureUnitDisplay = () => {
    switch (temperatureUnit) {
      case "CELSIUS":
        return t.celsius;
      case "FAHRENHEIT":
        return t.fahrenheit;
      case "KELVIN":
        return t.kelvin;
      default:
        return t.celsius;
    }
  };

  const getLanguageDisplay = () => {
    switch (language) {
      case "EN":
        return "English";
      case "ES":
        return "Español";
      case "FR":
        return "Français";
      case "DE":
        return "Deutsch";
      default:
        return "English";
    }
  };

  const showAbout = () => {
    Alert.alert(t.aboutTitle, t.aboutContent, [{ text: t.ok }]);
  };

  const showDataSources = () => {
    Alert.alert(t.dataSourcesTitle, t.dataSourcesContent, [{ text: t.ok }]);
  };

  return (
    <View style={settingStyles.container}>
      <StatusBar style="light" />

      <View
        style={{ height: insets.top, backgroundColor: colors.background }}
      />

      <View style={settingStyles.header}>
        <Text style={settingStyles.title}>{t.settings}</Text>
      </View>

      <ScrollView
        style={settingStyles.scrollView}
        contentContainerStyle={[
          settingStyles.contentContainer,
          { paddingBottom: tabBarBottomSpace + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={settingStyles.section}>
          <Text style={settingStyles.sectionTitle}>{t.weatherPreferences}</Text>

          <SettingItem
            title={t.temperatureUnit}
            subtitle={getTemperatureUnitDisplay()}
            onPress={handleTemperatureUnitChange}
            rightElement={<Text style={settingStyles.arrow}>›</Text>}
          />

          <SettingItem
            title={t.language}
            subtitle={getLanguageDisplay()}
            onPress={handleLanguageChange}
            rightElement={<Text style={settingStyles.arrow}>›</Text>}
          />
        </View>

        <View style={settingStyles.section}>
          <Text style={settingStyles.sectionTitle}>{t.favorites}</Text>

          <SettingItem
            title={t.favoriteCities}
            subtitle={`${favoriteCities.length} ${t.citiesSaved}`}
            rightElement={<Text style={settingStyles.arrow}>›</Text>}
          />
        </View>

        <View style={settingStyles.section}>
          <Text style={settingStyles.sectionTitle}>{t.information}</Text>

          <SettingItem
            title={t.about}
            subtitle={t.appVersionInfo}
            onPress={showAbout}
            rightElement={<Text style={settingStyles.arrow}>›</Text>}
          />

          <SettingItem
            title={t.dataSources}
            subtitle={t.weatherDataProviders}
            onPress={showDataSources}
            rightElement={<Text style={settingStyles.arrow}>›</Text>}
          />
        </View>

        <View style={settingStyles.tipContainer}>
          <Text style={settingStyles.tipTitle}>💡 {t.tips}</Text>
          <Text style={settingStyles.tipText}>
            {t.tipsPullToRefresh}
            {"\n"}
            {t.tipsAddFavorites}
            {"\n"}
            {t.tipsLocationPermission}
            {"\n"}
            {t.tipsAutoUpdate}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  item: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disabled: {
    opacity: 0.5,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: "600",
  },
  itemSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemRight: {
    marginLeft: spacing.md,
  },
  arrow: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  tipContainer: {
    margin: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  tipTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tipText: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
