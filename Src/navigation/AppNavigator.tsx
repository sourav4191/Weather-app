import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { HomeScreen } from "../../Src/screens/HomeScreen";
import { SearchScreen } from "../../Src/screens/SearchScreen";
import { SettingsScreen } from "../../Src/screens/SettingsScreen";
import { useNavigationInfo } from "../../Src/hooks/useNavigationInfo";
import { colors, typography } from "../../Src/styles/theme";
import { TabBarIcon } from "./TabBarIcon";
import { useTranslation } from "../hooks/useTranslation";

const Tab = createBottomTabNavigator();

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Settings: undefined;
};

export function AppNavigator() {
  const { tabBarBottomSpace } = useNavigationInfo();
  const t = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => (
          <TabBarIcon routeName={route.name} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.card,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: tabBarBottomSpace,
          height: Platform.select({
            ios: 88,
            android: 68 + tabBarBottomSpace,
          }),
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: typography.caption.fontSize,
          fontWeight: "600",
          marginBottom: Platform.OS === "android" ? 4 : 0,
        },
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS === "android",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t.weather,
          tabBarAccessibilityLabel: `${t.weather} tab`,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: t.search,
          tabBarAccessibilityLabel: `${t.search} tab`,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t.settings,
          tabBarAccessibilityLabel: `${t.settings} tab`,
        }}
      />
    </Tab.Navigator>
  );
}
