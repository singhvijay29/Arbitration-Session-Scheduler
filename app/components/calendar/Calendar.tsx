"use client";

import { useState, JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ViewSelector from "./ViewSelector";
import { useSelectedDate } from "../../context/SelectedDateContext";
import EventModal from "../modal/EventModal";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import { CalendarView, Event } from "./types";

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

      {currentView === "day" && (
        <DayView
          currentDate={currentDate}
          events={events}
          onEventClick={setSelectedEvent}
        />
      )}
      {currentView === "week" && (
        <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={setSelectedEvent}
        />
      )}
      {currentView === "month" && (
        <MonthView
          currentDate={currentDate}
          selectedDate={selectedDate}
          events={events}
          isDateDisabled={isDateDisabled}
          onDateClick={handleDateClick}
        />
      )}

      {selectedEvent && (
        <EventModal
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
