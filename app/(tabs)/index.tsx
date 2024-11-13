import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Card from '../components/card';
import {
  checkPedometerAvailability,
  getPastStepCount,
  startStepCountSubscription,
  stopStepCountSubscription,
} from '../services/pedometerService';
import { startLocationTracking, stopLocationTracking } from '../services/locationService';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [distanceTravelled, setDistanceTravelled] = useState(0);

  const toggleTracking = () => {
    if (isTracking) {
      // Stop tracking
      stopStepCountSubscription();
      stopLocationTracking();
      setIsTracking(false);
    } else {
      // Start tracking
      checkPedometerAvailability(setIsPedometerAvailable);
      getPastStepCount(setPastStepCount);
      startStepCountSubscription(setCurrentStepCount);
      startLocationTracking(setDistanceTravelled);
      setIsTracking(true);
    }
  };

  useEffect(() => {
    return () => {
      stopStepCountSubscription();
      stopLocationTracking();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card value={pastStepCount} title="Total Steps in 24 hours" />
        <Card value={currentStepCount} title="Current Steps" />
      </View>
      <View style={[styles.cardContainer , { marginTop: 20, justifyContent: 'flex-start', paddingLeft: 20 }]}>
        <Card value={`${(distanceTravelled / 1000).toFixed(2)} km`} title="Distance Travelled" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isTracking ? "Stop Tracking" : "Start Tracking"}
          onPress={toggleTracking}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20
  },
});
