import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Pedometer } from 'expo-sensors';
import { formatHourLabel } from '../services/pedometerService';

export default function AnalyticsScreen() {
  const [hourlyStepData, setHourlyStepData] = useState([]);

  const fetchHourlyStepCount = async () => {
    const end = new Date();
    const data = [];

    for (let i = 23; i >= 0; i--) {
      const start = new Date(end);
      start.setHours(end.getHours() - 1);
      
      const result = await Pedometer.getStepCountAsync(start, end);
      const steps = result ? result.steps : 0;

      const label = formatHourLabel(end);

      // Add the hourly step data
      data.unshift({ value: steps, label });
      end.setHours(end.getHours() - 1);
    }

    setHourlyStepData(data);
  };

  useEffect(() => {
    fetchHourlyStepCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>Hourly Step Count for Last 24 Hours</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={hourlyStepData}
            width={320}
            height={320}
            color="#ffd33d"
            yAxisThickness={1}
            xAxisThickness={1}
          />
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
    padding: 16,
  },
  text: {
    color: '#ffffff',
    marginBottom: 10,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10
  },
});
