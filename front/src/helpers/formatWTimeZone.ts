import { format } from 'date-fns';


export function formatWithTimeZone(dateString: string): string {
  try {
    const dateObj = new Date(dateString);
    return format(dateObj, 'dd/MM/yyyy HH:mm xxx');
  } catch (error) {
    return dateString;
  }
}