# Weather-app

Weather App
A cross-platform weather application built with React Native and Expo that provides real-time weather data and forecasts with a clean user interface.
Features
Core Functionality

- Current weather data with GPS location detection
- 5-day weather forecast with daily summaries and hourly details
- City search with search history
- Temperature unit conversion (Celsius, Fahrenheit, Kelvin)
- Multi-language support (English, Spanish, French, German)
- Favorite cities management
- Pull-to-refresh data updates
- Offline support with cached data
  Technical Features
- TypeScript implementation with type safety
- React Navigation with tab-based interface
- Context API state management with useReducer pattern
- Custom hooks for business logic separation
- Responsive design with theme system
- Error handling with error boundaries
- Safe area handling for status bar and navigation
  Technology Stack
- Framework: React Native with Expo SDK 53
- Language: TypeScript
- Navigation: React Navigation v7 with bottom tabs
- State Management: React Context with useReducer
- API: OpenWeatherMap REST API
- Storage: AsyncStorage for local data persistence
- Styling: StyleSheet with custom theming
  Project Structure
  weather-app/
  ├── Src/ # Main source code
  │ ├── assets/ # Images and fonts
  │ │ ├── fonts/
  │ │ └── images/
  │ ├── components/ # Reusable UI components
  │ │ ├── common/ # Generic components
  │ │ │ ├── Button/
  │ │ │ ├── ErrorBoundary/
  │ │ │ ├── LoadingSpinner/
  │ │ │ └── ErrorMessage.tsx
  │ │ └── weather/ # Weather-specific components
  │ │ ├── ForecastList/
  │ │ ├── WeatherCard/
  │ │ └── WeatherDetails/
  │ ├── context/ # State management
  │ │ └── WeatherContext.tsx
  │ ├── hooks/ # Custom React hooks
  │ │ ├── useLocation.ts
  │ │ ├── useNavigationInfo.ts
  │ │ ├── useStorage.ts
  │ │ └── useWeather.ts
  │ ├── navigation/ # Navigation configuration
  │ │ ├── AppNavigator.tsx
  │ │ ├── NavigationTheme.ts
  │ │ ├── TabBarIcon.tsx
  │ │ └── index.ts
  │ ├── screens/ # Screen components
  │ │ ├── HomeScreen/
  │ │ ├── SearchScreen/
  │ │ └── SettingsScreen/
  │ ├── services/ # External API services
  │ │ ├── locationService.ts
  │ │ ├── storageService.ts
  │ │ └── weatherAPI.ts
  │ ├── styles/ # Theme and styling
  │ │ └── theme.ts
  │ └── utils/ # Utilities and constants
  │ ├── constants.ts
  │ ├── helpers.ts
  │ └── types.ts
  ├── navigation/ # Navigation setup
  ├── App.tsx # Application entry point
  ├── app.json # Expo configuration
  ├── metro.config.js # Metro bundler config
  ├── package.json # Dependencies and scripts
  └── tsconfig.json # TypeScript configuration
  Installation
  Prerequisites
- Node.js (version 16 or higher)
- npm package manager
- Expo CLI
- iOS Simulator or Android Studio for testing
- Physical device with Expo Go app (optional)
  Setup Steps

1. Clone the repository
   git clone https://github.com/sourav4191/Weather-app.git
   cd weather-app
1. Install dependencies
   npm install
1. Configure API key
   _ Sign up at OpenWeatherMap for a free API key
   _ Open Src/utils/constants.ts \* Replace YOUR_API_KEY_HERE with your actual API key:
   export const WEATHER_API_KEY = 'your_openweathermap_api_key_here';
1. Start the development server
   npx expo start
1. Run on device/simulator
   _ iOS: Press i in terminal or scan QR code with Camera app
   _ Android: Press a in terminal or scan QR code with Expo Go app \* Web: Press w in terminal
   Key Implementation Details
   State Management Architecture
   Uses React Context with useReducer for state management:

- Centralized weather data management
- Predictable state updates through actions
- Type-safe state transitions
- No external dependencies required
  Navigation Structure
  Modular navigation setup with separated concerns:
- Tab-based navigation with React Navigation
- Custom tab bar icons with accessibility support
- Navigation theme configuration
- Type-safe navigation parameters
  Weather Data Processing
  Intelligent forecast handling:
- Groups hourly forecasts into daily summaries
- Calculates daily min/max temperatures
- Determines representative weather conditions
- Provides both overview and detailed views
  Cross-Platform Considerations
  Handles device variations:
- Dynamic navigation bar detection (3-button vs gesture)
- Safe area handling for status bars
- Platform-specific styling adjustments
- Responsive layout for different screen sizes
  Error Handling Strategy
  Comprehensive error management:
- API failure handling with retry mechanisms
- Network connectivity detection
- Location permission error handling
- User-friendly error messages
  API Configuration
  The app uses OpenWeatherMap API with these endpoints:
- Current Weather: /weather
- 5-Day Forecast: /forecast
  Free tier includes:
- 1,000 API calls per day
- 60 calls per minute
- Current weather and 5-day forecast access
  Build and Deployment
  Development Build
  npx expo start
  Android APK
  npx expo build:android --type apk
  iOS Build
  npx expo build:ios
  Using EAS Build
  npm install -g @expo/eas-cli
  eas build --platform all
  Testing
  Manual Testing Checklist
- Location permission handling
- Weather data loading
- City search functionality
- Temperature unit switching
- Language changes
- Offline behavior
- Error scenarios
- Different device sizes
  Device Compatibility
  Tested on:
- iOS 15+ devices
- Android 11+ devices
- Screen sizes from 5" to 6.7"
- Both portrait and landscape orientations
  Development Decisions
  Why Context Over Redux
- Simpler setup for medium-complexity state
- No additional dependencies
- Sufficient for current application scope
- Easy to migrate to Redux if needed
  Component Organization
- Folder-based component structure
- Separation of common and domain-specific components
- Index files for clean imports
- Co-location of component logic and styles
  TypeScript Usage
- Complete type coverage
- API response typing
- Component prop validation
- Custom hook return types
  Performance Optimizations
- FlatList for large data sets
- Component memoization with React.memo
- Debounced search input
- Lazy loading for non-critical components
  Troubleshooting
  Common Issues
  API Key Problems
- Verify API key is correctly set in constants.ts
- Check OpenWeatherMap account status
- New keys may take 60 minutes to activate
  Location Issues
- Grant location permissions in device settings
- Use city search as alternative
- Check network connectivity
  Build Errors
- Clear Metro cache: npx expo start -c
- Reinstall dependencies: rm -rf node_modules && npm install
- Verify TypeScript compilation: npx tsc --noEmit
  Performance Issues
- Reduce API call frequency
- Clear AsyncStorage data
- Restart development server
  Code Quality
  Patterns Used
- Custom hooks for business logic
- Higher-order components for error handling
- Separation of concerns in file structure
- Consistent naming conventions
  TypeScript Benefits
- Compile-time error detection
- Better IDE support and autocomplete
- Self-documenting code through types
- Refactoring safety
  Maintainability
- Modular architecture
- Clear component boundaries
- Centralized styling and theming
- Comprehensive error handling
