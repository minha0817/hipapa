import { DateTime } from "luxon";

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const dt = DateTime.local().set({
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0,
  });
  const formattedDate = dt.toISO();
  return formattedDate;
};
