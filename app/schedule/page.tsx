"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useScheduler } from "../context/SchedulerContext";
import { useRouter } from "next/navigation";
import { useRole } from "../context/RoleContext";
import Toast from "../components/Toast";

// Add this interface near the top of the file, after the imports
interface Session {
  id: string;
  caseNumber: string;
  date?: string;
  time?: string;
  end_time?: string;
  duration: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
}

const SessionForm: React.FC = () => {
  const { addSession, sessions, updateSession } = useScheduler();
  const router = useRouter();
  const { role } = useRole();
  const [formData, setFormData] = useState({
    caseNumber: "",
    date: "",
    time: "",
    duration: "30",
    arbitrator: "",
    claimant: "",
    respondent: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (id) {
      const sessionToEdit = sessions.find(
        (session: Session) => session.id === id
      );
      if (sessionToEdit) {
        // Handle both formats: separate date/time fields or end_time ISO string
        let date, time;
        if (sessionToEdit.date && sessionToEdit.time) {
          date = sessionToEdit.date;
          time = sessionToEdit.time;
        } else if (sessionToEdit.end_time) {
          const dateObj = new Date(sessionToEdit.end_time);
          date = dateObj.toISOString().split("T")[0];
          time = dateObj.toTimeString().substring(0, 5);
        }

        setFormData({
          caseNumber: sessionToEdit.caseNumber,
          date: date || "",
          time: time || "",
          duration: sessionToEdit.duration,
          arbitrator: sessionToEdit.arbitrator,
          claimant: sessionToEdit.claimant,
          respondent: sessionToEdit.respondent,
        });
        setEditMode(true);
        setSessionId(id);
      }
    }
  }, [sessions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      setToast({ message: "Please select both date and time", type: "error" });
      return;
    }

    const startTime = new Date(`${formData.date}T${formData.time}:00`);

    if (isNaN(startTime.getTime())) {
      setToast({ message: "Invalid date or time", type: "error" });
      return;
    }

    const durationInMinutes = parseInt(formData.duration);
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const arbitratorConflict = sessions.some((session: Session) => {
      if (editMode && session.id === sessionId) return false;
      if (
        session.arbitrator.toLowerCase() !== formData.arbitrator.toLowerCase()
      ) {
        return false;
      }
      const sessionStart = session.end_time
        ? new Date(`${session.date}T${session.time}`)
        : new Date(`${session.date}T${session.time}`);

      const sessionEnd = session.end_time
        ? new Date(`${session.date}T${session.end_time}`)
        : new Date(sessionStart.getTime() + parseInt(session.duration) * 60000);

      return startTime < sessionEnd && endTime > sessionStart;
    });

    if (arbitratorConflict) {
      setToast({
        message: "The arbitrator is already booked for this time slot.",
        type: "error",
      });
      return;
    }

    const sessionData = {
      id: editMode ? sessionId! : Date.now().toString(),
      ...formData,
      end_time: endTime.toTimeString().substring(0, 5),
      duration: durationInMinutes.toString(),
    };

    if (editMode) {
      updateSession(sessionId!, sessionData);
      setToast({ message: "Session updated successfully", type: "success" });
    } else {
      addSession(sessionData);
      setToast({ message: "Session scheduled successfully", type: "success" });
    }
    router.push("/");
  };

  // Redirect if not an arbitrator
  if (role !== "arbitrator") {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-red-500">Unauthorized</h2>
        <p className="mt-2 text-gray-600">
          Only arbitrators can schedule sessions.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="text-[20px] md:text-2xl font-semibold mb-2">
          {editMode ? "Edit Session" : "Schedule New Session"}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Case Number:</label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time:</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a time</option>
            {Array.from({ length: 23 }, (_, i) => {
              const hour = Math.floor(i / 2) + 9;
              const minutes = i % 2 === 0 ? "00" : "30";
              const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
              const ampm = hour >= 12 ? "PM" : "AM";
              const hour12 = hour > 12 ? hour - 12 : hour;
              return (
                <option key={time} value={time}>
                  {`${hour12}:${minutes} ${ampm}`}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Duration:</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="30">30 mins</option>
            <option value="45">45 mins</option>
            <option value="60">1 hour</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Arbitrator:</label>
          <input
            type="text"
            name="arbitrator"
            value={formData.arbitrator}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Claimant Email:</label>
          <input
            type="email"
            name="claimant"
            value={formData.claimant}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Respondent Email:</label>
          <input
            type="email"
            name="respondent"
            value={formData.respondent}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {editMode ? "Update Session" : "Schedule Session"}
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default SessionForm;
