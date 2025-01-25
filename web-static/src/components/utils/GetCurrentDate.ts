export const GetCurrentDate = (): string => {
  const date = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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

  const dayName = days[date.getDay()]; // Get the day name (e.g., "Saturday")
  const day = date.getDate(); // Get the date number (e.g., 30)
  const month = months[date.getMonth()]; // Get the short month name (e.g., "Nov")
  const year = date.getFullYear(); // Get the year (e.g., 2024)

  return `Today, ${day} ${month}, ${year}`; // Format: "Today, 30 Nov, 2024"
};
