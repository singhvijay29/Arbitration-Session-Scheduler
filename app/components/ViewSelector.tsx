"use client";

import { CalendarDays, Calendar as CalendarIcon, Clock } from "lucide-react";

interface ViewSelectorProps {
  currentView: "day" | "week" | "month";
  onViewChange: (view: "day" | "week" | "month") => void;
}

export default function ViewSelector({
  currentView,
  onViewChange,
}: ViewSelectorProps) {
  return (
    <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg w-max">
      <button
        onClick={() => onViewChange("day")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === "day"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Day</span>
      </button>
      <button
        onClick={() => onViewChange("week")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === "week"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <CalendarDays className="w-4 h-4" />
        <span className="text-sm font-medium">Week</span>
      </button>
      <button
        onClick={() => onViewChange("month")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
          currentView === "month"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <CalendarIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Month</span>
      </button>
    </div>
  );
}
