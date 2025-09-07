// Src/styles/theme.ts - COMPLETE VERSION
export const colors = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  error: '#CF6679',
  warning: '#FF9800',
  success: '#4CAF50',
  gradient: {
    start: '#1976D2',
    end: '#42A5F5',
  },
  weather: {
    sunny: '#FFA726',
    cloudy: '#78909C',
    rainy: '#42A5F5',
    stormy: '#5C6BC0',
    snowy: '#E1F5FE',
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
};

export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};