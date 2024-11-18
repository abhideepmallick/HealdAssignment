import { Pedometer, Accelerometer } from 'expo-sensors';
import { Platform, PermissionsAndroid } from 'react-native';

let pedometerSubscription = null;
let accelerometerSubscription = null;
let stepCount = 0;

// Function to check if the pedometer sensor is available on the device
export const checkPedometerAvailability = async (setIsPedometerAvailable) => {
  if (Platform.OS === 'ios') {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  } else {
    setIsPedometerAvailable('true'); // Assume accelerometer is available on Android
  }
};

// Function to get the step count for the past 24 hours (iOS only)
export const getPastStepCount = async (setPastStepCount) => {
  if (Platform.OS === 'ios') {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
    if (pastStepCountResult) {
      setPastStepCount(pastStepCountResult.steps);
    }
  } else {
    setPastStepCount(stepCount); // For Android, initialize with 0 or existing step count
  }
};

// Function to start a live step count subscription
export const startStepCountSubscription = (setCurrentStepCount) => {
  if (Platform.OS === 'ios') {
    // Use Pedometer for iOS
    pedometerSubscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
    });
  } else {
    // Use Accelerometer for Android
    accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;

      // Basic threshold to detect movement that could be counted as a step
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 1.2) { // Adjust this threshold as needed
        stepCount += 1;
        setCurrentStepCount(stepCount);
      }
    });
    Accelerometer.setUpdateInterval(500); // Set update interval for accelerometer
  }
};

// Function to stop the live step count subscription
export const stopStepCountSubscription = () => {
  if (Platform.OS === 'ios' && pedometerSubscription) {
    pedometerSubscription.remove();
    pedometerSubscription = null;
  }
  if (Platform.OS === 'android' && accelerometerSubscription) {
    accelerometerSubscription.remove();
    accelerometerSubscription = null;
  }
};

// Utility function to format a given date into a 12-hour format with AM/PM
export const formatHourLabel = (date) => {
  let hours = date.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  // convert to 12 hours instead of 24 hours
  hours = hours % 12 || 12;
  return `${hours} ${period}`;
};
