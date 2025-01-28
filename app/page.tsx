"use client";

import AppointmentBooking from "./components/scheduling/AppointmentBooking";
import Calendar from "./components/calendar/Calendar";
import ScheduledSessions from "./components/scheduling/ScheduledSessions";
import { useRole } from "./context/RoleContext";
import { useScheduler } from "./context/SchedulerContext";

export default function Home() {
  const { sessions } = useScheduler();
  const { role } = useRole();

  return (
    <div className="space-y-8 w-full">
      <div className="text-[20px] md:text-2xl font-semibold mb-2">Calendar</div>
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <div className="w-full">
          <Calendar events={sessions} />
        </div>
        {role === "user" && <AppointmentBooking />}
      </div>
      {role === "user" && <ScheduledSessions />}
    </div>
  );
}
