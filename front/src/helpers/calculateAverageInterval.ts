import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

function calculateAverageInterval(logs: IServiceLogOutputDTO[]): string {
  if (logs.length < 2) return "N/A";

  const sortedLogs = logs.sort((a, b) =>
    new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );

  let totalInterval = 0;
  let intervalCount = 0;

  for (let i = 1; i < sortedLogs.length; i++) {
    const currentTime = new Date(sortedLogs[i].start_at).getTime();
    const previousTime = new Date(sortedLogs[i - 1].start_at).getTime();
    const interval = currentTime - previousTime;

    if (interval < 60 * 60 * 1000) {
      totalInterval += interval;
      intervalCount++;
    }
  }

  if (intervalCount === 0) return "N/A";

  const averageMs = totalInterval / intervalCount;
  const averageSeconds = Math.round(averageMs / 1000);

  if (averageSeconds < 60) {
    return `${averageSeconds}s`;
  } else if (averageSeconds < 3600) {
    return `${Math.round(averageSeconds / 60)}m`;
  } else {
    return `${Math.round(averageSeconds / 3600)}h`;
  }
}

export { calculateAverageInterval }