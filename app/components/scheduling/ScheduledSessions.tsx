import { useState, useEffect } from "react";
import { useSelectedDate } from "../../context/SelectedDateContext";
import { Session, useScheduler } from "../../context/SchedulerContext";

export default function ScheduledSessions() {
  const { selectedDate } = useSelectedDate();
  const { bookingVersion, setBookingVersion } = useScheduler();

  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  useEffect(() => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const bookedSlots = JSON.parse(
      localStorage.getItem("booked_slots") || "[]"
    );
    setFilteredSessions(
      bookedSlots.filter((session: Session) => {
        const sessionDate = new Date(session.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return sessionDate === formattedDate;
      })
    );
  }, [selectedDate, bookingVersion]);

  const handleCancelSession = (sessionId: string) => {
    const bookedSlots = JSON.parse(
      localStorage.getItem("booked_slots") || "[]"
    );
    const updatedSlots = bookedSlots.filter(
      (session: Session) => session.id !== sessionId
    );
    localStorage.setItem("booked_slots", JSON.stringify(updatedSlots));
    handleBookingChange();
    setFilteredSessions(
      bookedSlots.filter((session: Session) => {
        const sessionDate = new Date(session.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return sessionDate === updatedSlots;
      })
    );
  };

  const handleBookingChange = () => {
    setBookingVersion((v: number) => v + 1);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Booked Slots</h2>
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
                  Respondent: {session.respondent} <br /> Claimant:{" "}
                  {session.claimant}
                </p>
                <p className="text-sm text-gray-500">
                  {session.date}, {session.time} - {session.end_time}
                </p>
              </div>
              <button
                onClick={() => handleCancelSession(session.id)}
                className="text-red-500 hover:underline ml-3"
              >
                Cancel Session
              </button>
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
