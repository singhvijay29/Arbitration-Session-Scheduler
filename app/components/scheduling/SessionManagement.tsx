import type React from "react";
import { useScheduler } from "../../context/SchedulerContext";
import Link from "next/link";

const SessionManagement: React.FC = () => {
  const { sessions, deleteSession } = useScheduler();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Sessions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Case Number</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Arbitrator</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="border p-2">{session.caseNumber}</td>
              <td className="border p-2">
                {new Date(session.date).toDateString()}
              </td>
              <td className="border p-2">{session.time}</td>
              <td className="border p-2">{session.arbitrator}</td>
              <td className="border p-2">
                <Link
                  href={`/edit/${session.id}`}
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
    </div>
  );
};

export default SessionManagement;
