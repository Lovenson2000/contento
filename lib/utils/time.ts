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

export function formatYoutubeVideoDuration(duration: string): string {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const match = regex.exec(duration);

  if (!match) return "0:00";

  const hours = match[1] ? parseInt(match[1].replace("H", ""), 10) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", ""), 10) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", ""), 10) : 0;

  const totalMinutes = hours * 60 + minutes;
  return `${totalMinutes}:${seconds.toString().padStart(2, "0")}`;
}
