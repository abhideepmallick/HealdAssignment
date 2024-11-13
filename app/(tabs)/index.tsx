import { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import Card from '../components/card';
import {
  checkPedometerAvailability,
  getPastStepCount,
  startStepCountSubscription,
  stopStepCountSubscription,
} from '../services/pedometerService'; // Import pedometer-related functions for step count tracking
import { startLocationTracking, stopLocationTracking } from '../services/locationService'; // Import location tracking functions
import { startTimer, stopTimer, formatElapsedTime } from '../services/timerService'; // Import timer functions for elapsed time tracking

// Define the Index component for activity tracking with pedometer, timer, and location data
export default function Index() {
  // State variables for pedometer availability, step counts, tracking status, distance, and elapsed time
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0); // Total steps in the past 24 hours
  const [currentStepCount, setCurrentStepCount] = useState(0); // Current step count since tracking started
  const [isTracking, setIsTracking] = useState(false); // Boolean to indicate tracking status
  const [distanceTravelled, setDistanceTravelled] = useState(0); // Distance travelled in meters
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds since tracking started

  // Function to toggle tracking on and off
  const toggleTracking = () => {
    if (isTracking) {
      // Stop tracking: stop step count, location, and timer
      stopStepCountSubscription();
      stopLocationTracking();
      stopTimer();
      setIsTracking(false); // Update tracking status
      setCurrentStepCount(0); // Reset current step count
      setDistanceTravelled(0); // Reset distance travelled
      setElapsedTime(0); // Reset elapsed time
    } else {
      // Start tracking: check pedometer availability, retrieve past steps, and start tracking
      checkPedometerAvailability(setIsPedometerAvailable);
      getPastStepCount(setPastStepCount); // Retrieve step count from past 24 hours

      // Start step count subscription with an update callback
      startStepCountSubscription((stepCount) => {
        setCurrentStepCount(stepCount); // Update current step count
        if (stepCount === 0) {
          setDistanceTravelled(0); // Set distance to 0 if step count is 0
        }
      });

      startLocationTracking(setDistanceTravelled); // Start location tracking to calculate distance
      startTimer(setElapsedTime); // Start timer for elapsed time
      setIsTracking(true); // Update tracking status
    }
  };

  // Cleanup on component unmount: stop subscriptions and timer
  useEffect(() => {
    return () => {
      stopStepCountSubscription();
      stopLocationTracking();
      stopTimer();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Display past step count and current step count in card components */}
        <View style={styles.cardContainer}>
          <Card value={pastStepCount} title="Total Steps in 24 hours" />
          <Card value={currentStepCount} title="Current Steps" />
        </View>

        {/* Display distance travelled and elapsed time in card components */}
        <View style={styles.cardContainer}>
          <Card value={`${(distanceTravelled / 1000).toFixed(2)} km`} title="Distance Travelled" />
          <Card value={formatElapsedTime(elapsedTime)} title="Time Elapsed" />
        </View>

        {/* Button to start or stop tracking based on the tracking status */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleTracking}>
            <Text style={styles.buttonText}>{isTracking ? "Stop Tracking" : "Start Tracking"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for layout, buttons, and cards
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Dark background color for the screen
  },
  scrollViewContent: {
    alignItems: 'center', // Center content horizontally
    paddingVertical: 16, // Padding at the top and bottom of scrollable content
  },
  cardContainer: {
    width: '90%', // Ensures the container width stays within screen bounds
    flexDirection: 'row', // Arrange cards in a row
    justifyContent: 'space-between', // Space cards evenly
    marginVertical: 10, // Margin above and below the card container
  },
  buttonContainer: {
    marginTop: 20, // Spacing above the button container
    width: '80%', // Set width for button container to center it
    alignItems: 'center', // Center-align the button horizontally
  },
  button: {
    borderColor: '#ffd33d', // Border color for the button
    borderWidth: 2, // Border thickness
    borderRadius: 25, // Rounded corners
    paddingVertical: 10, // Vertical padding for button
    paddingHorizontal: 20, // Horizontal padding for button
    alignItems: 'center', // Center-align text within button
  },
  buttonText: {
    color: '#ffd33d', // Button text color
    fontSize: 16, // Font size for button text
    fontWeight: 'bold', // Bold font for button text
  },
});
