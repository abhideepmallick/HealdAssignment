let startTimestamp = null; // Variable to store the starting timestamp of the timer
let timerInterval = null; // Variable to hold the interval ID for the timer

// Function to start the timer and calculate elapsed time
export const startTimer = (setElapsedTime) => {
  startTimestamp = Date.now(); // Record the start time in milliseconds

  // Start a timer that updates every second
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000); // Calculate elapsed time in seconds
    setElapsedTime(elapsedSeconds); // Update the elapsed time state in the component
  }, 1000); // Set interval to 1000 ms (1 second)
};

// Function to stop the timer
export const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval); // Clear the interval to stop the timer
    timerInterval = null; // Reset the interval variable
  }
  startTimestamp = null; // Reset the start timestamp
};

// Function to format elapsed time into "HH:MM:SS" format
export const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600); // Calculate hours from seconds
  const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes
  const secs = seconds % 60; // Calculate remaining seconds
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // Return the formatted time string with leading zeros for hours, minutes, and seconds
};
