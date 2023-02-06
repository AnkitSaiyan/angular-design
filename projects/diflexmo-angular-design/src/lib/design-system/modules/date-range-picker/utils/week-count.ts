export function weekCount(year: number, monthNumber: number): number {
  const firstOfMonth = new Date(year, monthNumber, 1);
  const lastOfMonth = new Date(year, monthNumber + 1, 0);

  const day = 7 - (7 - firstOfMonth.getDay() + 1) + 1;
  const day2 = 7 - (lastOfMonth.getDay() + 1);
  const used = day + day2 + lastOfMonth.getDate();

  return Math.ceil(used / 7);
}
