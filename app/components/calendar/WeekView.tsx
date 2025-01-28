import { Event } from "./types";

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function WeekView({
  currentDate,
  events,
  onEventClick,
}: WeekViewProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <div className="w-[600px] min-w-full overflow-x-auto">
        <div className="grid grid-cols-8 border-b bg-white sticky top-0 min-w-[800px]">
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
        <div className="divide-y overflow-y-auto h-[calc(600px-65px)] min-w-[800px]">
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
                        onClick={() => onEventClick(event)}
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
    </div>
  );
}
