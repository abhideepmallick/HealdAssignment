import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Card from '../components/card';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  let subscription = null;

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      subscription = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  const toggleTracking = () => {
    if (isTracking) {
      // Stop tracking
      if (subscription) {
        subscription.remove();
        subscription = null;
      }
      setIsTracking(false);
    } else {
      // Start tracking
      subscribe();
      setIsTracking(true);
    }
  };

  useEffect(() => {
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Pedometer Available: {isPedometerAvailable}</Text>
      <Card value={pastStepCount} title="Steps in the last 24 hours" />
      <Card value={currentStepCount} title="Current Steps" />
      
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
});
