import { Event } from "./types";
import React, { JSX } from "react";

interface MonthViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  events: Event[];
  isDateDisabled: (date: Date) => boolean;
  onDateClick: (date: Date) => void;
}

export default function MonthView({
  currentDate,
  selectedDate,
  events,
  isDateDisabled,
  onDateClick,
}: MonthViewProps) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<td key={`empty-${i}`} className="p-4"></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const isToday =
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    const isDayDisabled = isDateDisabled(currentDay);

    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });

    days.push(
      <td key={day} className="p-0 md:p-3 relative h-[52px] md:h-[64px]">
        <div
          className={`w-6 md:w-8 p-[4px] md:p-3 h-6 md:h-8 flex items-center justify-center rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] md:text-[16px]
          ${
            isToday
              ? "bg-blue-500 text-white cursor-pointer"
              : currentDay.toDateString() === selectedDate?.toDateString()
              ? "bg-blue-200 text-blue-800 cursor-pointer"
              : isDayDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200 cursor-pointer"
          }`}
          onClick={() => onDateClick(currentDay)}
        >
          {day}
        </div>
        {!isDayDisabled && dayEvents.length > 0 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer flex flex-wrap gap-[2px] justify-center items-center">
            {dayEvents && (
              <div className="w-[5px] md:w-2 h-[5px] md:h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
        )}
      </td>
    );
  }

  const rows: JSX.Element[] = [];
  let cells: JSX.Element[] = [];

  days.forEach((day, i) => {
    if (i % 7 !== 0) {
      cells.push(day);
    } else {
      if (cells.length > 0) {
        rows.push(<tr key={i}>{cells}</tr>);
      }
      cells = [day];
    }
    if (i === days.length - 1) {
      rows.push(<tr key={i}>{cells}</tr>);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow px-1 md:px-0 py-1 md:py-2">
      <table className="w-full">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th
                key={day}
                className="px-1 py-2 md:py-4 md:px-4 text-[12px] md:text-[14px] font-medium"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
