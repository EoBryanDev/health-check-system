import { IVolumetryData } from "@/interfaces/IDashboard";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

function processVolumetryData(logs: IServiceLogOutputDTO[]): IVolumetryData[] {
  if (!logs || logs.length === 0) {
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i.toString().padStart(2, '0')}:00`,
      volume: 0,
    }));
  }

  const now = new Date();
  const hoursMap = new Map<string, number>();

  for (let i = 0; i < 24; i++) {
    const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    const hourKey = hour.getHours().toString().padStart(2, '0') + ':00';
    hoursMap.set(hourKey, 0);
  }

  logs.forEach(log => {
    const logDate = new Date(log.start_at);
    const hoursDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60));

    if (hoursDiff >= 0 && hoursDiff < 24) {
      const hourKey = logDate.getHours().toString().padStart(2, '0') + ':00';
      const currentCount = hoursMap.get(hourKey) || 0;
      hoursMap.set(hourKey, currentCount + 1);
    }
  });

  return Array.from(hoursMap.entries())
    .sort((a, b) => {
      const hourA = parseInt(a[0].split(':')[0]);
      const hourB = parseInt(b[0].split(':')[0]);
      return hourA - hourB;
    })
    .map(([timestamp, volume]) => ({
      timestamp,
      volume,
    }));
}

export { processVolumetryData }