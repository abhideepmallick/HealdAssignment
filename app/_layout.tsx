import { Stack } from "expo-router"; // Import Stack for stack-based navigation layout

// Define RootLayout component to manage the overall stack navigation structure
export default function RootLayout() {
  return (
    <Stack>
      {/* Define a screen within the stack navigation */}
      <Stack.Screen 
        name="(tabs)" // Specify the name of the screen, linking it to the "(tabs)" route
        options={{ headerShown: false }} // Hide the header for this screen
      />
    </Stack>
  );
}
