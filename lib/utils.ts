import { Session } from "../app/context/SchedulerContext";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const isDateDisabled = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const checkScheduleConflict = (
  startTime: Date,
  endTime: Date,
  existingSessions: Session[],
  excludeId?: string
): boolean => {
  return existingSessions.some((session) => {
    if (excludeId && session.id === excludeId) return false;

    const sessionStart = new Date(`${session.date}T${session.time}`);
    const sessionEnd = new Date(`${session.date}T${session.end_time}`);

    return startTime < sessionEnd && endTime > sessionStart;
  });
};
