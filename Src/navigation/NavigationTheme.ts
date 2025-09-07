import { Platform } from 'react-native';
import { colors } from '../styles/theme';


export const navigationTheme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.card,
    notification: colors.secondary,
  },
  fonts: {
    regular: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
      }),
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto-Medium',
        default: 'System',
      }),
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto-Bold',
        default: 'System',
      }),
      fontWeight: 'bold' as const,
    },
    heavy: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto-Black',
        default: 'System',
      }),
      fontWeight: '700' as const,
    },
  },
};