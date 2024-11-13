import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LineChart } from "react-native-gifted-charts"; // Import LineChart component for data visualization
import { Pedometer } from 'expo-sensors'; // Import Pedometer to access step count data
import { formatHourLabel } from '../services/pedometerService'; // Import utility function to format hours

// Define AnalyticsScreen component to display step count data in a line chart
export default function AnalyticsScreen() {
  const [hourlyStepData, setHourlyStepData] = useState([]); // State to store hourly step data for chart

  // Function to fetch step count data for each hour in the past 24 hours
  const fetchHourlyStepCount = async () => {
    const end = new Date(); // Initialize end time as the current time
    const data = []; // Initialize an empty array to store step data

    // Loop to retrieve step data for each of the last 24 hours
    for (let i = 23; i >= 0; i--) {
      const start = new Date(end); // Set start time as one hour before end time
      start.setHours(end.getHours() - 1); // Move start time back by one hour

      // Fetch step count for the hour interval from start to end
      const result = await Pedometer.getStepCountAsync(start, end);
      const steps = result ? result.steps : 0; // If result exists, retrieve steps, else set to 0

      const label = formatHourLabel(end); // Format the hour label (e.g., "2 PM")

      // Add the hourly step data to the beginning of the array
      data.unshift({ value: steps, label });
      end.setHours(end.getHours() - 1); // Move end time back by one hour for next iteration
    }

    setHourlyStepData(data); // Update state with the fetched step data
  };

  // Fetch hourly step count data when the component mounts
  useEffect(() => {
    fetchHourlyStepCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>Hourly Step Count for Last 24 Hours</Text>
        {/* Chart container for displaying the line chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={hourlyStepData} // Data for the chart
            width={320} // Width of the chart
            height={320} // Height of the chart
            color="#ffd33d" // Color of the chart line
            yAxisThickness={1} // Thickness of Y-axis line
            xAxisThickness={1} // Thickness of X-axis line
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the AnalyticsScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Background color of the entire screen
  },
  scrollViewContent: {
    alignItems: 'center', // Center content horizontally
    padding: 16, // Padding around the content
  },
  text: {
    color: '#ffffff', // Text color for the title
    marginBottom: 10, // Space below the title
  },
  chartContainer: {
    width: '100%', // Make container take full width
    alignItems: 'center', // Center the chart within the container
    backgroundColor: '#ffffff', // Background color of chart container
    borderRadius: 10, // Rounded corners for chart container
    padding: 10, // Padding inside the chart container
  },
});
