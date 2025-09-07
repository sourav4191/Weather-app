// utils/translations.ts (NEW FILE)
export interface TranslationKeys {
  // Navigation
  weather: string;
  search: string;
  settings: string;

  // Home Screen
  weatherDetails: string;
  forecast5Day: string;
  hourlyForecast: string;
  humidity: string;
  wind: string;
  visibility: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  feelsLike: string;
  high: string;
  low: string;

  // Search Screen
  searchWeather: string;
  enterCityName: string;
  searchPlaceholder: string;
  favoriteCities: string;
  recentSearches: string;
  searchFailed: string;
  cityNotFound: string;
  success: string;
  weatherDataLoaded: string;

  // Settings Screen
  weatherPreferences: string;
  temperatureUnit: string;
  language: string;
  favorites: string;
  citiesSaved: string;
  information: string;
  about: string;
  dataSources: string;
  appVersionInfo: string;
  weatherDataProviders: string;
  tips: string;
  tipsPullToRefresh: string;
  tipsAddFavorites: string;
  tipsLocationPermission: string;
  tipsAutoUpdate: string;

  // Temperature Units
  celsius: string;
  fahrenheit: string;
  kelvin: string;

  // Time Labels
  today: string;
  tomorrow: string;

  // Error Messages
  gettingWeather: string;
  searchingWeather: string;
  refreshFailed: string;
  unableToRefresh: string;
  invalidInput: string;
  pleaseEnterCity: string;
  networkError: string;
  locationDenied: string;
  locationUnavailable: string;
  apiError: string;
  invalidApiKey: string;
  locationNotFound: string;
  rateLimitExceeded: string;
  unknownError: string;
  tryAgain: string;
  ok: string;

  // Loading States
  loading: string;
  refreshing: string;

  // About Dialog
  aboutTitle: string;
  aboutContent: string;
  dataSourcesTitle: string;
  dataSourcesContent: string;
}

export const translations: Record<string, TranslationKeys> = {
  EN: {
    // Navigation
    weather: "Weather",
    search: "Search",
    settings: "Settings",

    // Home Screen
    weatherDetails: "Weather Details",
    forecast5Day: "5-Day Forecast",
    hourlyForecast: "Hourly Forecast",
    humidity: "Humidity",
    wind: "Wind",
    visibility: "Visibility",
    pressure: "Pressure",
    sunrise: "Sunrise",
    sunset: "Sunset",
    feelsLike: "Feels like",
    high: "H",
    low: "L",

    // Search Screen
    searchWeather: "Search Weather",
    enterCityName: "Enter city name...",
    searchPlaceholder: "Enter city name...",
    favoriteCities: "Favorite Cities",
    recentSearches: "Recent Searches",
    searchFailed: "Search Failed",
    cityNotFound: "City not found or network error. Please try again.",
    success: "Success",
    weatherDataLoaded: "Weather data loaded for",

    // Settings Screen
    weatherPreferences: "Weather Preferences",
    temperatureUnit: "Temperature Unit",
    language: "Language",
    favorites: "Favorites",
    citiesSaved: "cities saved",
    information: "Information",
    about: "About",
    dataSources: "Data Sources",
    appVersionInfo: "App version and information",
    weatherDataProviders: "Weather data providers",
    tips: "Tips",
    tipsPullToRefresh: "• Pull down on the home screen to refresh weather data",
    tipsAddFavorites: "• Add cities to favorites for quick access",
    tipsLocationPermission:
      "• Allow location permissions for automatic updates",
    tipsAutoUpdate: "• Weather data updates every hour automatically",

    // Temperature Units
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",

    // Time Labels
    today: "Today",
    tomorrow: "Tomorrow",

    // Error Messages
    gettingWeather: "Getting your weather...",
    searchingWeather: "Searching for weather...",
    refreshFailed: "Refresh Failed",
    unableToRefresh: "Unable to refresh weather data. Please try again later.",
    invalidInput: "Invalid Input",
    pleaseEnterCity: "Please enter a city name",
    networkError: "Network connection failed. Please check your internet.",
    locationDenied:
      "Location permission denied. Please grant permission in settings.",
    locationUnavailable:
      "Location is temporarily unavailable. Please try again.",
    apiError: "Weather service temporarily unavailable.",
    invalidApiKey: "Invalid API key. Please check your configuration.",
    locationNotFound: "Location not found. Please check the city name.",
    rateLimitExceeded: "API rate limit exceeded. Please try again later.",
    unknownError: "An unexpected error occurred.",
    tryAgain: "Try Again",
    ok: "OK",

    // Loading States
    loading: "Loading...",
    refreshing: "Refreshing...",

    // About Dialog
    aboutTitle: "About Weather App",
    aboutContent:
      "Weather App v1.0.0\n\nBuilt with React Native & Expo\nPowered by OpenWeatherMap API\n\nFeatures:\n• Real-time weather data\n• 5-day forecast\n• Location-based updates\n• City search\n• Multi-language support\n• Favorite cities",
    dataSourcesTitle: "Data Sources",
    dataSourcesContent:
      "Weather data provided by OpenWeatherMap\n\nLocation services powered by device GPS\n\nIcons and emojis represent weather conditions",
  },

  ES: {
    // Navigation
    weather: "Clima",
    search: "Buscar",
    settings: "Configuración",

    // Home Screen
    weatherDetails: "Detalles del Clima",
    forecast5Day: "Pronóstico de 5 Días",
    hourlyForecast: "Pronóstico por Horas",
    humidity: "Humedad",
    wind: "Viento",
    visibility: "Visibilidad",
    pressure: "Presión",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    feelsLike: "Sensación de",
    high: "M",
    low: "B",

    // Search Screen
    searchWeather: "Buscar Clima",
    enterCityName: "Ingresa nombre de ciudad...",
    searchPlaceholder: "Ingresa nombre de ciudad...",
    favoriteCities: "Ciudades Favoritas",
    recentSearches: "Búsquedas Recientes",
    searchFailed: "Búsqueda Fallida",
    cityNotFound: "Ciudad no encontrada o error de red. Inténtalo de nuevo.",
    success: "Éxito",
    weatherDataLoaded: "Datos del clima cargados para",

    // Settings Screen
    weatherPreferences: "Preferencias del Clima",
    temperatureUnit: "Unidad de Temperatura",
    language: "Idioma",
    favorites: "Favoritos",
    citiesSaved: "ciudades guardadas",
    information: "Información",
    about: "Acerca de",
    dataSources: "Fuentes de Datos",
    appVersionInfo: "Versión e información de la app",
    weatherDataProviders: "Proveedores de datos meteorológicos",
    tips: "Consejos",
    tipsPullToRefresh:
      "• Desliza hacia abajo en la pantalla principal para actualizar",
    tipsAddFavorites: "• Agrega ciudades a favoritos para acceso rápido",
    tipsLocationPermission:
      "• Permite permisos de ubicación para actualizaciones automáticas",
    tipsAutoUpdate:
      "• Los datos del clima se actualizan automáticamente cada hora",

    // Temperature Units
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",

    // Time Labels
    today: "Hoy",
    tomorrow: "Mañana",

    // Error Messages
    gettingWeather: "Obteniendo tu clima...",
    searchingWeather: "Buscando clima...",
    refreshFailed: "Actualización Fallida",
    unableToRefresh:
      "No se pudo actualizar los datos del clima. Inténtalo más tarde.",
    invalidInput: "Entrada Inválida",
    pleaseEnterCity: "Por favor ingresa el nombre de una ciudad",
    networkError: "Falla en la conexión de red. Verifica tu internet.",
    locationDenied:
      "Permiso de ubicación denegado. Otorga permiso en configuración.",
    locationUnavailable:
      "Ubicación temporalmente no disponible. Inténtalo de nuevo.",
    apiError: "Servicio meteorológico temporalmente no disponible.",
    invalidApiKey: "Clave API inválida. Verifica tu configuración.",
    locationNotFound:
      "Ubicación no encontrada. Verifica el nombre de la ciudad.",
    rateLimitExceeded: "Límite de API excedido. Inténtalo más tarde.",
    unknownError: "Ocurrió un error inesperado.",
    tryAgain: "Intentar de Nuevo",
    ok: "OK",

    // Loading States
    loading: "Cargando...",
    refreshing: "Actualizando...",

    // About Dialog
    aboutTitle: "Acerca de Weather App",
    aboutContent:
      "Weather App v1.0.0\n\nCreada con React Native & Expo\nPotenciada por OpenWeatherMap API\n\nCaracterísticas:\n• Datos del clima en tiempo real\n• Pronóstico de 5 días\n• Actualizaciones basadas en ubicación\n• Búsqueda de ciudades\n• Soporte multi-idioma\n• Ciudades favoritas",
    dataSourcesTitle: "Fuentes de Datos",
    dataSourcesContent:
      "Datos meteorológicos proporcionados por OpenWeatherMap\n\nServicios de ubicación potenciados por GPS del dispositivo\n\nIconos y emojis representan condiciones climáticas",
  },

  FR: {
    // Navigation
    weather: "Météo",
    search: "Rechercher",
    settings: "Paramètres",

    // Home Screen
    weatherDetails: "Détails Météo",
    forecast5Day: "Prévisions 5 Jours",
    hourlyForecast: "Prévisions Horaires",
    humidity: "Humidité",
    wind: "Vent",
    visibility: "Visibilité",
    pressure: "Pression",
    sunrise: "Lever du soleil",
    sunset: "Coucher du soleil",
    feelsLike: "Ressenti",
    high: "H",
    low: "B",

    // Search Screen
    searchWeather: "Rechercher Météo",
    enterCityName: "Entrez le nom de la ville...",
    searchPlaceholder: "Entrez le nom de la ville...",
    favoriteCities: "Villes Favorites",
    recentSearches: "Recherches Récentes",
    searchFailed: "Recherche Échouée",
    cityNotFound: "Ville non trouvée ou erreur réseau. Réessayez.",
    success: "Succès",
    weatherDataLoaded: "Données météo chargées pour",

    // Settings Screen
    weatherPreferences: "Préférences Météo",
    temperatureUnit: "Unité de Température",
    language: "Langue",
    favorites: "Favoris",
    citiesSaved: "villes sauvegardées",
    information: "Information",
    about: "À propos",
    dataSources: "Sources de Données",
    appVersionInfo: "Version et informations de l'app",
    weatherDataProviders: "Fournisseurs de données météo",
    tips: "Conseils",
    tipsPullToRefresh:
      "• Tirez vers le bas sur l'écran d'accueil pour actualiser",
    tipsAddFavorites: "• Ajoutez des villes aux favoris pour un accès rapide",
    tipsLocationPermission:
      "• Autorisez les permissions de localisation pour les mises à jour automatiques",
    tipsAutoUpdate:
      "• Les données météo se mettent à jour automatiquement chaque heure",

    // Temperature Units
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",

    // Time Labels
    today: "Aujourd'hui",
    tomorrow: "Demain",

    // Error Messages
    gettingWeather: "Récupération de votre météo...",
    searchingWeather: "Recherche de météo...",
    refreshFailed: "Actualisation Échouée",
    unableToRefresh:
      "Impossible d'actualiser les données météo. Réessayez plus tard.",
    invalidInput: "Entrée Invalide",
    pleaseEnterCity: "Veuillez entrer un nom de ville",
    networkError: "Échec de la connexion réseau. Vérifiez votre internet.",
    locationDenied:
      "Permission de localisation refusée. Accordez la permission dans les paramètres.",
    locationUnavailable: "Localisation temporairement indisponible. Réessayez.",
    apiError: "Service météo temporairement indisponible.",
    invalidApiKey: "Clé API invalide. Vérifiez votre configuration.",
    locationNotFound: "Localisation non trouvée. Vérifiez le nom de la ville.",
    rateLimitExceeded: "Limite d'API dépassée. Réessayez plus tard.",
    unknownError: "Une erreur inattendue s'est produite.",
    tryAgain: "Réessayer",
    ok: "OK",

    // Loading States
    loading: "Chargement...",
    refreshing: "Actualisation...",

    // About Dialog
    aboutTitle: "À propos de Weather App",
    aboutContent:
      "Weather App v1.0.0\n\nConstruite avec React Native & Expo\nAlimentée par l'API OpenWeatherMap\n\nFonctionnalités:\n• Données météo en temps réel\n• Prévisions sur 5 jours\n• Mises à jour basées sur la localisation\n• Recherche de villes\n• Support multi-langues\n• Villes favorites",
    dataSourcesTitle: "Sources de Données",
    dataSourcesContent:
      "Données météo fournies par OpenWeatherMap\n\nServices de localisation alimentés par le GPS de l'appareil\n\nIcônes et emojis représentent les conditions météo",
  },

  DE: {
    // Navigation
    weather: "Wetter",
    search: "Suchen",
    settings: "Einstellungen",

    // Home Screen
    weatherDetails: "Wetter Details",
    forecast5Day: "5-Tage Vorhersage",
    hourlyForecast: "Stündliche Vorhersage",
    humidity: "Luftfeuchtigkeit",
    wind: "Wind",
    visibility: "Sichtweite",
    pressure: "Druck",
    sunrise: "Sonnenaufgang",
    sunset: "Sonnenuntergang",
    feelsLike: "Gefühlt",
    high: "H",
    low: "T",

    // Search Screen
    searchWeather: "Wetter Suchen",
    enterCityName: "Stadtname eingeben...",
    searchPlaceholder: "Stadtname eingeben...",
    favoriteCities: "Lieblingsstädte",
    recentSearches: "Letzte Suchen",
    searchFailed: "Suche Fehlgeschlagen",
    cityNotFound:
      "Stadt nicht gefunden oder Netzwerkfehler. Bitte erneut versuchen.",
    success: "Erfolg",
    weatherDataLoaded: "Wetterdaten geladen für",

    // Settings Screen
    weatherPreferences: "Wetter Einstellungen",
    temperatureUnit: "Temperatureinheit",
    language: "Sprache",
    favorites: "Favoriten",
    citiesSaved: "Städte gespeichert",
    information: "Information",
    about: "Über",
    dataSources: "Datenquellen",
    appVersionInfo: "App Version und Informationen",
    weatherDataProviders: "Wetterdatenanbieter",
    tips: "Tipps",
    tipsPullToRefresh:
      "• Ziehen Sie auf dem Startbildschirm nach unten, um zu aktualisieren",
    tipsAddFavorites:
      "• Fügen Sie Städte zu Favoriten für schnellen Zugriff hinzu",
    tipsLocationPermission:
      "• Erlauben Sie Standortberechtigungen für automatische Updates",
    tipsAutoUpdate: "• Wetterdaten werden automatisch jede Stunde aktualisiert",

    // Temperature Units
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",

    // Time Labels
    today: "Heute",
    tomorrow: "Morgen",

    // Error Messages
    gettingWeather: "Ihr Wetter wird abgerufen...",
    searchingWeather: "Wetter suchen...",
    refreshFailed: "Aktualisierung Fehlgeschlagen",
    unableToRefresh:
      "Wetterdaten können nicht aktualisiert werden. Bitte später erneut versuchen.",
    invalidInput: "Ungültige Eingabe",
    pleaseEnterCity: "Bitte geben Sie einen Stadtnamen ein",
    networkError:
      "Netzwerkverbindung fehlgeschlagen. Überprüfen Sie Ihr Internet.",
    locationDenied:
      "Standortberechtigung verweigert. Gewähren Sie die Berechtigung in den Einstellungen.",
    locationUnavailable:
      "Standort vorübergehend nicht verfügbar. Bitte erneut versuchen.",
    apiError: "Wetterdienst vorübergehend nicht verfügbar.",
    invalidApiKey:
      "Ungültiger API-Schlüssel. Überprüfen Sie Ihre Konfiguration.",
    locationNotFound: "Standort nicht gefunden. Überprüfen Sie den Stadtnamen.",
    rateLimitExceeded:
      "API-Limit überschritten. Bitte später erneut versuchen.",
    unknownError: "Ein unerwarteter Fehler ist aufgetreten.",
    tryAgain: "Erneut Versuchen",
    ok: "OK",

    // Loading States
    loading: "Laden...",
    refreshing: "Aktualisieren...",

    // About Dialog
    aboutTitle: "Über Weather App",
    aboutContent:
      "Weather App v1.0.0\n\nErstellt mit React Native & Expo\nBetrieben von OpenWeatherMap API\n\nFunktionen:\n• Echtzeit-Wetterdaten\n• 5-Tage-Vorhersage\n• Standortbasierte Updates\n• Stadtsuche\n• Mehrsprachiger Support\n• Lieblingsstädte",
    dataSourcesTitle: "Datenquellen",
    dataSourcesContent:
      "Wetterdaten bereitgestellt von OpenWeatherMap\n\nStandortdienste betrieben von Geräte-GPS\n\nIcons und Emojis repräsentieren Wetterbedingungen",
  },
};
