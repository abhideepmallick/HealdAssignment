import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the Card component that displays a value and title in a styled box
const Card = ({ value, title }) => {
  return (
    <View style={styles.card}>
      {/* Display the main value in bold with larger font */}
      <Text style={styles.value}>{value}</Text>
      {/* Display the title below the value as a descriptive label */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Card;

// Define styles for the Card component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 10, // Rounded corners for card
    paddingVertical: 20, // Vertical padding inside card
    paddingHorizontal: 15, // Horizontal padding inside card
    alignItems: 'center', // Center-align content horizontally
    justifyContent: 'space-between', // Space content vertically for even distribution
    shadowColor: '#000', // Shadow color for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow blur radius for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    elevation: 3, // Elevation for Android shadow effect
    width: 180, // Fixed width for card layout
    height: 200, // Fixed height for card layout
  },
  value: {
    fontSize: 44, // Large font size for main value
    fontWeight: 'bold', // Bold font weight for emphasis
    color: '#333', // Darker color for contrast
    marginBottom: 10, // Space below value
  },
  title: {
    fontSize: 14, // Smaller font size for the title
    color: '#666', // Lighter gray color for less emphasis
  },
});
