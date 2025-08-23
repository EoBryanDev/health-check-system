const parseSecondsToIsoString = (timeInSeconds: number) => {
  const now = new Date();
  const incremented_date = new Date(now.getTime() + timeInSeconds * 1000);

  return incremented_date.toISOString();
};

export { parseSecondsToIsoString };
