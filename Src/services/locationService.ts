import * as ExpoLocation from "expo-location";
import { Location, AppError } from "../utils/types";

class LocationService {
  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<Location> {
    try {
      // Check if location services are enabled
      const enabled = await ExpoLocation.hasServicesEnabledAsync();
      if (!enabled) {
        throw {
          message:
            "Location services are disabled. Please enable them in settings.",
          code: "LOCATION_SERVICES_DISABLED",
        } as AppError;
      }

      // Check permissions
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        throw {
          message:
            "Location permission denied. Please grant permission in settings.",
          code: "LOCATION_PERMISSION_DENIED",
        } as AppError;
      }

      // Custom timeout implementation (15 seconds)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("E_LOCATION_TIMEOUT")), 15000)
      );

      // Get current location with a timeout
      const location = await Promise.race([
        ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.Balanced,
        }),
        timeoutPromise,
      ]);

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error: any) {
      if (error.message === "E_LOCATION_TIMEOUT") {
        throw {
          message: "Location request timed out. Please try again.",
          code: "LOCATION_TIMEOUT",
        } as AppError;
      } else if (error.code === "E_LOCATION_UNAVAILABLE") {
        throw {
          message: "Location is temporarily unavailable. Please try again.",
          code: "LOCATION_UNAVAILABLE",
        } as AppError;
      }

      throw error;
    }
  }

  async reverseGeocode(location: Location): Promise<string> {
    try {
      const addresses = await ExpoLocation.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        return `${address.city || address.district || address.subregion}, ${
          address.region
        }`;
      }

      return "Unknown Location";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Unknown Location";
    }
  }
}

export const locationService = new LocationService();
