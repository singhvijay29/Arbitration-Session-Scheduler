"use client";

import type React from "react";
import { Session, useScheduler } from "../context/SchedulerContext";
import Link from "next/link";
import { Delete, Edit } from "lucide-react";
import { useRole } from "../context/RoleContext";

const EventManagement: React.FC = () => {
  const { sessions, deleteSession } = useScheduler();
  const { role } = useRole();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Events</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No sessions found.</p>
          <Link
            href="/schedule"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Create a new event
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((event: Session) => (
            <div
              key={event.id}
              className="bg-white rounded-lg p-6 flex items-start justify-between shadow-md"
            >
              <div className="flex flex-col items-start md:flex-row gap-6">
                {/* Date/Time Section */}
                <div className="bg-gray-50 rounded-lg p-4 text-center min-w-[120px]">
                  <div className="text-gray-600 uppercase text-sm font-medium">
                    {(() => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      const tomorrow = new Date();
                      tomorrow.setDate(today.getDate() + 1);

                      if (eventDate.toDateString() === today.toDateString()) {
                        return "Today";
                      } else if (
                        eventDate.toDateString() === tomorrow.toDateString()
                      ) {
                        return "Tomorrow";
                      } else {
                        return event.date;
                      }
                    })()}
                  </div>
                  <div className="text-2xl font-bold">{event.time}</div>
                </div>

                {/* Event Details */}
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {event.caseNumber} by {event.arbitrator}
                    </h2>
                  </div>
                  <div className="text-sm text-gray-600">
                    Respondent: {event.respondent}
                    <br />
                    Claimant: {event.claimant}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {role !== "user" && (
                <div className="flex items-center gap-4">
                  <div className="flex gap-4">
                    <Link
                      href={`/schedule?id=${event.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => deleteSession(event.id)}
                      className="text-red-500 hover:underline"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManagement;
