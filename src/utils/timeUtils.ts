export const TIME_LABELS = ['Night', 'Morning', 'Afternoon', 'Evening'] as const;
export const TIME_BINS = [0, 6, 12, 18, 24] as const;

export function getTimeOfDay(hour: number): typeof TIME_LABELS[number] {
  if (hour >= 0 && hour < 6) return 'Night';
  if (hour >= 6 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 18) return 'Afternoon';
  return 'Evening';
}

export function getTravelSeason(date: Date): string {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  if ([12, 1, 2].includes(month)) return 'Winter';
  if ([3, 4, 5].includes(month)) return 'Spring';
  if ([6, 7, 8].includes(month)) return 'Summer';
  return 'Autumn';
}