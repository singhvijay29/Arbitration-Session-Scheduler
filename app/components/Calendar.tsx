"use client";

import { useState, JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ViewSelector from "./ViewSelector";
import { useSelectedDate } from "../context/SelectedDateContext";
import EventModal from "../modal/EventModal";

type CalendarView = "day" | "week" | "month";

type Event = {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
};

export default function Calendar({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<CalendarView>("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { setSelectedDate, selectedDate } = useSelectedDate();

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9am to 8pm
    const dayEvents = events.filter(
      (event) =>
        new Date(event.date).toDateString() === currentDate.toDateString()
    );

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex items-start p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-20 text-sm font-medium text-gray-500">
                {hour === 9
                  ? "9 AM"
                  : hour < 12
                  ? `${hour} AM`
                  : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
              </div>
              <div className="flex-1 min-h-[60px] pl-4 border-l border-gray-200">
                {dayEvents
                  .filter(
                    (event) => parseInt(event.time.split(":")[0]) === hour
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="p-2 mb-2 rounded-lg bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors"
                    >
                      <div className="font-medium text-blue-900">
                        {event.caseNumber}
                      </div>
                      <div className="text-sm text-blue-700">
                        {event.arbitrator} • {event.time}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + i);
      return date;
    });

    const hours = Array.from({ length: 24 }, (_, i) => i); // Change to 24-hour format

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 border-r"></div>
          {days.map((date) => (
            <div
              key={date.toISOString()}
              className="p-4 text-center border-r last:border-r-0"
            >
              <div className="font-medium">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className="text-sm text-gray-500">{date.getDate()}</div>
            </div>
          ))}
        </div>
        <div className="divide-y">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8">
              <div className="py-4 px-2 text-right text-sm text-gray-500 border-r">
                {hour.toString().padStart(2, "0")}:00
              </div>
              {days.map((date) => {
                const dayEvents = events.filter(
                  (event) =>
                    new Date(event.date).toDateString() === date.toDateString()
                );
                const hourEvents = dayEvents.filter(
                  (event) => parseInt(event.time.split(":")[0]) === hour
                );

                return (
                  <div
                    key={date.toISOString()}
                    className="py-4 px-2 border-r last:border-r-0"
                  >
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-blue-100 p-1 rounded mb-1 text-xs cursor-pointer hover:bg-blue-200"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Case {event.caseNumber}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
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
            onClick={() => handleDateClick(currentDay)}
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
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case "day":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 1 : -1)
        );
        setSelectedDate(newDate);
        break;
      case "week":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 7 : -7)
        );
        break;
      case "month":
        newDate.setMonth(
          currentDate.getMonth() + (direction === "next" ? 1 : -1)
        );
        break;
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="md:p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateDate("prev")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={() => navigateDate("next")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {currentView === "day" && renderDayView()}
      {currentView === "week" && renderWeekView()}
      {currentView === "month" && renderMonthView()}

      {selectedEvent && (
        <EventModal
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
