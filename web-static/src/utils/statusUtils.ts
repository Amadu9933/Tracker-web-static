// Centralized status color and date formatting utilities

/**
 * Returns the Tailwind color class (text or bg) associated with the given status.
 * @param {string} status - The status string (e.g., 'delivered', 'pending').
 * @param {'text' | 'bg'} [mode='text'] - Whether to return a text or background color class.
 * @returns {string} The Tailwind color class for the given status and mode.
 */
export function getStatusColor(
  status: string,
  mode: 'text' | 'bg' = 'text'
): string {
  const s = status.trim().toLowerCase();
  if (mode === 'bg') {
    switch (s) {
      case 'delivered':
        return 'bg-[#B4D479]';
      case 'on the way':
        return 'bg-[#FFE393]';
      case 'cancelled':
      case 'canceled':
        return 'bg-[#EA8389]';
      case 'returned':
        return 'bg-[#FFC19E]';
      case 'in transit':
        return 'bg-[#87CEEB]';
      case 'pending':
        return 'bg-[#FFA500]';
      default:
        return 'bg-black';
    }
  } else {
    switch (s) {
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
      case 'canceled':
        return 'text-red-500';
      case 'returned':
        return 'text-orange-500';
      case 'in transit':
        return 'text-blue-400';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-600';
    }
  }
}

/**
 * Formats a given datetime string into an HTML string with date and time separated.
 * If time is missing or undefined, only the date is shown.
 * @param {string} datetime - The datetime string (e.g. '2024-06-07 14:30').
 * @returns {string} HTML string with formatted date and time.
 */
export function formatDateTime(datetime: string): string {
  if (!datetime) return '-';
  const [date, time] = datetime.split(' ');
  if (!date) return '-';
  if (!time || time === 'undefined') {
    return date;
  }
  return `${date} ${time}`;
}

/**
 * Returns the current date in the format: "Today, 30 Nov, 2024".
 * @returns {string} The formatted current date string.
 */
export function getCurrentDate(): string {
  const date = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Today, ${day} ${month}, ${year}`;
}
