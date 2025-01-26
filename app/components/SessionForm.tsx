import type React from "react";
import { useState } from "react";
import { useScheduler } from "../context/SchedulerContext";
import { useRouter } from "next/router";

interface FormData {
  caseNumber: string;
  date: string;
  time: string;
  duration: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
  end_time: string;
}

const SessionForm: React.FC = () => {
  const { addSession, sessions } = useScheduler();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    caseNumber: "",
    date: "",
    time: "",
    duration: "30",
    arbitrator: "",
    claimant: "",
    respondent: "",
    end_time: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check for scheduling conflicts
    const startTime = new Date(`${formData.date}T${formData.time}`);
    const durationInMinutes = parseInt(formData.duration);
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    const conflict = sessions.some((session) => {
      const sessionStart = new Date(session.date + "T" + session.time);
      const sessionDuration = parseInt(session.duration);
      const sessionEnd = new Date(
        sessionStart.getTime() + sessionDuration * 60000
      );
      return startTime < sessionEnd && endTime > sessionStart;
    });

    if (conflict) {
      setError("This time slot is already booked.");
      return;
    }

    addSession({
      id: Date.now().toString(),
      ...formData,
      date: new Date(formData.date).toISOString(),
      end_time: endTime.toISOString(),
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule New Session</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
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
        Schedule Session
      </button>
    </form>
  );
};

export default SessionForm;
