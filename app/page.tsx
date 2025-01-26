"use client";

import Calendar from "./components/Calendar";
import ScheduledSessions from "./components/ScheduledSessions";
import { useScheduler } from "./context/SchedulerContext";

export default function Home() {
  const { sessions } = useScheduler();

  return (
    <div className="space-y-8">
      <div className="text-[20px] md:text-2xl font-semibold mb-2">Calendar</div>
      <Calendar events={sessions} />
      <ScheduledSessions />
    </div>
  );
}
