import { Pedometer } from 'expo-sensors'; // Import Pedometer from Expo for step tracking

let subscription = null; // Variable to hold the step count subscription

// Function to check if the pedometer sensor is available on the device
export const checkPedometerAvailability = async (setIsPedometerAvailable) => {
  const isAvailable = await Pedometer.isAvailableAsync(); // Check pedometer availability
  setIsPedometerAvailable(String(isAvailable)); // Update the availability state as a string ("true" or "false")
};

// Function to get the step count for the past 24 hours
export const getPastStepCount = async (setPastStepCount) => {
  const end = new Date(); // Current date and time as the end time
  const start = new Date(); // Clone of the current date to modify for the start time
  start.setDate(end.getDate() - 1); // Set start time to 24 hours before the current time

  const pastStepCountResult = await Pedometer.getStepCountAsync(start, end); // Fetch step count from start to end
  if (pastStepCountResult) {
    setPastStepCount(pastStepCountResult.steps); // Update past step count if data is available
  }
};

// Function to start a live step count subscription
export const startStepCountSubscription = (setCurrentStepCount) => {
  subscription = Pedometer.watchStepCount(result => {
    setCurrentStepCount(result.steps); // Update the current step count on each step detected
  });
};

// Function to stop the live step count subscription
export const stopStepCountSubscription = () => {
  if (subscription) {
    subscription.remove(); // Remove the subscription if it exists
    subscription = null; // Clear the subscription variable
  }
};

// Utility function to format a given date into a 12-hour format with AM/PM
export const formatHourLabel = (date) => {
  let hours = date.getHours(); // Get hours in 24-hour format
  const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM based on hours
  hours = hours % 12 || 12; // Convert to 12-hour format, using 12 instead of 0 for midnight/noon
  return `${hours} ${period}`; // Return formatted time as "H AM/PM"
};
