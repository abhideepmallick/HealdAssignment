import { Tabs } from 'expo-router'; // Import Tabs from Expo Router for tab navigation
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons for tab icons

// Define the TabLayout component that renders the tab navigation
export default function TabLayout() {
  return (
    <Tabs
      // Configure default screen options for the tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d', // Active tab icon and label color
        headerStyle: {
          backgroundColor: '#25292e', // Background color of the header
        },
        headerShadowVisible: false, // Removes the shadow under the header for a flat design
        headerTintColor: '#fff', // Color of the header title and back button
        tabBarStyle: {
          backgroundColor: '#25292e', // Background color of the tab bar
        },
      }}
    >
      {/* Define the "Activity" tab screen */}
      <Tabs.Screen
        name="index" // The route name for this tab, which links to the "index" screen
        options={{
          title: 'Activity', // Title displayed in the tab bar and header
          tabBarIcon: ({ color, focused }) => (
            // Show a walking icon, changing between filled and outline based on focus
            <Ionicons name={focused ? 'walk-sharp' : 'walk-outline'} color={color} size={24} />
          ),
        }}
      />
      
      {/* Define the "Analytics" tab screen */}
      <Tabs.Screen
        name="analytics" // The route name for this tab, linking to the "analytics" screen
        options={{
          title: 'Analytics', // Title displayed in the tab bar and header
          tabBarIcon: ({ color, focused }) => (
            // Show an analytics icon, toggling between filled and outline based on focus
            <Ionicons name={focused ? 'analytics-sharp' : 'analytics-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
