import * as Location from 'expo-location';

let locationSubscription = null;
let previousLocation = null;

// Function to calculate the distance between two locations using the Haversine formula
const calculateDistance = (start, end) => {
  const toRad = (x) => (x * Math.PI) / 180; // Helper function to convert degrees to radians
  const R = 6371e3; // Earth's radius in meters

  const dLat = toRad(end.latitude - start.latitude); // Difference in latitude in radians
  const dLon = toRad(end.longitude - start.longitude); // Difference in longitude in radians
  const lat1 = toRad(start.latitude); // Start latitude in radians
  const lat2 = toRad(end.latitude); // End latitude in radians

  // Haversine formula to calculate the great-circle distance between two points
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Returns the distance in meters
};

// Function to start tracking location and calculate distance travelled
export const startLocationTracking = async (setDistanceTravelled) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error("Location permission not granted");
    return;
  }

  previousLocation = null; // Ensure previousLocation is reset at the start

  locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 1,
    },
    (newLocation) => {

      if (previousLocation) {
        const distance = calculateDistance(previousLocation.coords, newLocation.coords);

        // Ensure we return the accumulated distance correctly
        setDistanceTravelled((prevDistance) => prevDistance + distance);
      }
      
      previousLocation = newLocation; // Update previous location
    }
  );
};

// Function to stop location tracking
export const stopLocationTracking = () => {
  if (locationSubscription) {
    locationSubscription.remove(); // Remove location subscription
    locationSubscription = null; // Clear the subscription variable
  }
  previousLocation = null; // Reset previous location for next tracking session
};