import { Pedometer } from 'expo-sensors';

let subscription = null;

export const checkPedometerAvailability = async (setIsPedometerAvailable) => {
  const isAvailable = await Pedometer.isAvailableAsync();
  setIsPedometerAvailable(String(isAvailable));
};

export const getPastStepCount = async (setPastStepCount) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 1);

  const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
  if (pastStepCountResult) {
    setPastStepCount(pastStepCountResult.steps);
  }
};

export const startStepCountSubscription = (setCurrentStepCount) => {
  subscription = Pedometer.watchStepCount(result => {
    setCurrentStepCount(result.steps);
  });
};

export const stopStepCountSubscription = () => {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
};
