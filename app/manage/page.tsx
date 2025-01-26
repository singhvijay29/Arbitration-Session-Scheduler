"use client";

import type React from "react";
import { useScheduler } from "../context/SchedulerContext";
import Link from "next/link";

// Add this interface before the component
interface Session {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  duration: string;
  arbitrator: string;
}

const SessionManagement: React.FC = () => {
  const { sessions, deleteSession } = useScheduler();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[20px] md:text-2xl font-semibold mb-4">
        Manage Sessions
      </div>
      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No sessions found.</p>
          <Link
            href="/schedule"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Schedule a new session
          </Link>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Case Number</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Arbitrator</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session: Session) => (
              <tr key={session.id}>
                <td className="border p-2">{session.caseNumber}</td>
                <td className="border p-2">
                  {new Date(session.date).toDateString()}
                </td>
                <td className="border p-2">{session.time}</td>
                <td className="border p-2">{session.duration} mins</td>
                <td className="border p-2">{session.arbitrator}</td>
                <td className="border p-2">
                  <Link
                    href={`/schedule?id=${session.id}`}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionManagement;
