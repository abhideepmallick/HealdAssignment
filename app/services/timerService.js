let timerInterval = null;
let elapsedTime = 0;

export const startTimer = (setElapsedTime) => {
  elapsedTime = 0;
  timerInterval = setInterval(() => {
    elapsedTime += 1;
    setElapsedTime(elapsedTime);
  }, 1000);
};

export const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

export const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
