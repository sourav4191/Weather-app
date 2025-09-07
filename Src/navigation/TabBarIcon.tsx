import React from 'react';
import { Text } from 'react-native';

interface TabBarIconProps {
  routeName: string;
  focused: boolean;
  size?: number;
}

export function TabBarIcon({ routeName, focused, size = 24 }: TabBarIconProps) {
  const getIconName = (): string => {
    switch (routeName) {
      case 'Home':
        return focused ? '🏠' : '🏘️';
      case 'Search':
        return focused ? '🔍' : '🔎';
      case 'Settings':
        return focused ? '⚙️' : '🔧';
      default:
        return '❓';
    }
  };

  return (
    <Text 
      style={{ fontSize: size }}
      accessible={true}
      accessibilityLabel={`${routeName} ${focused ? 'selected' : 'unselected'}`}
    >
      {getIconName()}
    </Text>
  );
}