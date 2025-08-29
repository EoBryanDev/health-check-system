import { IVolumetryData } from "@/interfaces/IDashboard";
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";

function processVolumetryData(logs: IServiceLogOutputDTO[]): IVolumetryData[] {

  const hoursMap = new Map<string, number>();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (let i = 0; i < 24; i++) {
    const hourKey = `${i.toString().padStart(2, '0')}:00`;
    hoursMap.set(hourKey, 0);
  }

  logs.forEach((log, _index) => {

    const logDate = new Date(log.start_at);

    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());

    if (logDay.getTime() === today.getTime()) {
      const hour = logDate.getHours();
      const hourKey = `${hour.toString().padStart(2, '0')}:00`;

      const currentCount = hoursMap.get(hourKey) || 0;
      hoursMap.set(hourKey, currentCount + 1);

    }
  });

  const result = Array.from(hoursMap.entries())
    .sort((a, b) => {
      const hourA = parseInt(a[0].split(':')[0]);
      const hourB = parseInt(b[0].split(':')[0]);
      return hourA - hourB;
    })
    .map(([timestamp, volume]) => ({
      timestamp,
      volume,
    }));


  return result;
}

export { processVolumetryData };