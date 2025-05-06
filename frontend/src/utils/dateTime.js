// Method to format date as YYYY-MM-DD
export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Method to format time in 24-hour format as HH:mm
export const getFormattedTime = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Method to get the name of the day (e.g., Sunday, Monday, etc.)
export const getDayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

export const isCurrentTimeGreaterThan = (endTime) => {
  // Get the current time in HH:mm format
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

  // Convert endTime (HH:mm) to minutes for comparison
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const endTimeMinutes = endHours * 60 + endMinutes;

  return currentTime > endTimeMinutes;
};
