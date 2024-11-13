import * as Location from 'expo-location';

let locationSubscription = null;
let previousLocation = null;


const calculateDistance = (start, end) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters

  const dLat = toRad(end.latitude - start.latitude);
  const dLon = toRad(end.longitude - start.longitude);
  const lat1 = toRad(start.latitude);
  const lat2 = toRad(end.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export const startLocationTracking = async setDistanceTravelled => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error("Location permission not granted");
    return;
  }

  locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // Update every 5 seconds
      distanceInterval: 1, // Update if user moves 1 meter
    },
    newLocation => {
      if (previousLocation) {
        const distance = calculateDistance(previousLocation.coords, newLocation.coords);
        setDistanceTravelled(prevDistance => prevDistance + distance);
      }
      previousLocation = newLocation;
    }
  );
};

export const stopLocationTracking = () => {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
};
