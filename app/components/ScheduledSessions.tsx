import { useState, useEffect } from "react";
import { useSelectedDate } from "../context/SelectedDateContext";
import { useScheduler } from "../context/SchedulerContext";
import type { Session } from "../context/SchedulerContext";

export default function ScheduledSessions() {
  const { selectedDate } = useSelectedDate();
  const { sessions } = useScheduler();

  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  useEffect(() => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setFilteredSessions(
      sessions.filter((session) => {
        const sessionDate = new Date(session.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return sessionDate === formattedDate;
      })
    );
  }, [selectedDate, sessions]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Scheduled Sessions</h2>
      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div key={session.id} className="flex items-center gap-4">
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full bg-gray-200 flex items-center justify-center text-md font-medium">
                {session.arbitrator?.slice(0, 1)}
              </div>
              <div>
                <h3 className="font-medium">
                  Session with {session.arbitrator}
                </h3>
                <p className="text-sm text-gray-500">
                  {session.date}, {session.time} - {session.end_time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No sessions scheduled for this day.
          </p>
        )}
      </div>
    </div>
  );
}
