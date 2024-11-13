let startTimestamp = null;
let timerInterval = null;

export const startTimer = (setElapsedTime) => {
  startTimestamp = Date.now();
  
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
    setElapsedTime(elapsedSeconds);
  }, 1000);
};

export const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  startTimestamp = null;
};

export const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
