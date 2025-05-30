export function getWeekDay(dateStr: string): string {
  const days = [
    "yakshanba",
    "dushanba",
    "seshanba",
    "chorshanba",
    "payshanba",
    "juma",
    "shanba",
  ];
  const date = new Date(dateStr);
  return days[date.getDay()];
}
