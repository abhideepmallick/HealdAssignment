import { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import Card from '../components/card';
import {
  checkPedometerAvailability,
  getPastStepCount,
  startStepCountSubscription,
  stopStepCountSubscription,
} from '../services/pedometerService';
import { startLocationTracking, stopLocationTracking } from '../services/locationService';
import { startTimer, stopTimer, formatElapsedTime } from '../services/timerService';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds

  const toggleTracking = () => {
    if (isTracking) {
      stopStepCountSubscription();
      stopLocationTracking();
      stopTimer();
      setIsTracking(false);
    } else {
      checkPedometerAvailability(setIsPedometerAvailable);
      getPastStepCount(setPastStepCount);
      startStepCountSubscription(setCurrentStepCount);
      startLocationTracking(setDistanceTravelled);
      startTimer(setElapsedTime);
      setIsTracking(true);
    }
  };

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
        <View style={styles.cardContainer}>
          <Card value={pastStepCount} title="Total Steps in 24 hours" />
          <Card value={currentStepCount} title="Current Steps" />
        </View>
        <View style={styles.cardContainer}>
          <Card value={`${(distanceTravelled / 1000).toFixed(2)} km`} title="Distance Travelled" />
          <Card value={formatElapsedTime(elapsedTime)} title="Time Elapsed" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleTracking}>
            <Text style={styles.buttonText}>{isTracking ? "Stop Tracking" : "Start Tracking"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardContainer: {
    width: '90%', // Ensure the container stays within screen bounds
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    borderColor: '#ffd33d',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
