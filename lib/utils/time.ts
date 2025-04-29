/**
 * Format a date to something like "May 5, 4:30 PM"
 */
export function formatRemindTime(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getTimeUntilReminder(remindAt: Date): number {
  const now = new Date();
  return remindAt.getTime() - now.getTime();
}
