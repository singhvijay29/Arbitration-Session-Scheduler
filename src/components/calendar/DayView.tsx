import React from "react";

interface DayViewProps {
  currentDate: Date;
  events: any[];
  onEventClick: (event: any) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9);

  const dayEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === currentDate.toDateString()
  );

  console.log("Current Date:", currentDate);
  console.log("Events:", events);
  console.log("Day Events:", dayEvents);

  return (
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
              .filter((event) => parseInt(event.time.split(":")[0]) === hour)
              .map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
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
  );
};

export default DayView;
