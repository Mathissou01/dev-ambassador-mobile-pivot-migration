export function dateDiffInHoursAndMinutes(date1: Date, date2: Date): string {
  const diffInMilliseconds: number = Math.abs(date1.getTime() - date2.getTime());
  const hours: number = Math.floor(diffInMilliseconds / 3600000); // 1 heure = 60 minutes * 60 secondes * 1000 millisecondes
  const minutes: number = Math.floor((diffInMilliseconds % 3600000) / 60000); // 1 minute = 60 secondes * 1000 millisecondes

  return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
}
