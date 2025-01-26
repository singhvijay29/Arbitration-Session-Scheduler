"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useSelectedDate } from "../context/SelectedDateContext";

interface ViewSelectorProps {
  currentView: "day" | "week" | "month";
  onViewChange: (view: "day" | "week" | "month") => void;
}

export default function ViewSelector({
  currentView,
  onViewChange,
}: ViewSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSelectedDate } = useSelectedDate();
  const views = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
      >
        <span>{views.find((v) => v.id === currentView)?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-white border rounded-lg shadow-lg z-10">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => {
                onViewChange(view.id as "day" | "week" | "month");
                setIsOpen(false);
                setSelectedDate(new Date());
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                currentView === view.id ? "bg-gray-50" : ""
              } ${view.id === "day" ? "rounded-t-lg" : ""} ${
                view.id === "month" ? "rounded-b-lg" : ""
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
