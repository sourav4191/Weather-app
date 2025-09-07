import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationInfo {
  tabBarBottomSpace: number;
  isGestureNavigation: boolean;
  hasThreeButtons: boolean;
  statusBarHeight: number;
}

export function useNavigationInfo(): NavigationInfo {
  const insets = useSafeAreaInsets();
  const [navInfo, setNavInfo] = useState<NavigationInfo>({
    tabBarBottomSpace: 0,
    isGestureNavigation: true,
    hasThreeButtons: false,
    statusBarHeight: 0,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      const { height } = Dimensions.get('window');
      const { height: screenHeight } = Dimensions.get('screen');
      
      // Calculate navigation bar height
      const navigationBarHeight = screenHeight - height;
      
      // Detect navigation type
      const isGestureNavigation = insets.bottom > 0;
      const hasThreeButtons = navigationBarHeight > 60 && insets.bottom === 0;
      
      // Calculate appropriate bottom space for tab bar
      let tabBarBottomSpace = 8; // Default padding
      if (isGestureNavigation) {
        tabBarBottomSpace = Math.max(8, insets.bottom);
      } else if (hasThreeButtons) {
        tabBarBottomSpace = Math.max(8, navigationBarHeight - 10);
      }

      setNavInfo({
        tabBarBottomSpace,
        isGestureNavigation,
        hasThreeButtons,
        statusBarHeight: insets.top,
      });
    } else {
      // iOS handling
      setNavInfo({
        tabBarBottomSpace: Math.max(20, insets.bottom),
        isGestureNavigation: true,
        hasThreeButtons: false,
        statusBarHeight: insets.top,
      });
    }
  }, [insets.bottom, insets.top]);

  return navInfo;
}