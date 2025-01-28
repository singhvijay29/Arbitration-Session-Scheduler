"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import dummyData from "../../public/data/dummyData.json"; // Import the JSON data

export interface Session {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
  end_time: string;
  duration: string;
}

interface SchedulerContextType {
  sessions: Session[];
  addSession: (session: Session) => void;
  updateSession: (id: string, updatedSession: Session) => void;
  deleteSession: (id: string) => void;
  bookingVersion: number;
  setBookingVersion: (value: number | ((prev: number) => number)) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(
  undefined
);

export const SchedulerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bookingVersion, setBookingVersion] = useState(0);

  const sortSessions = (sessions: Session[]) => {
    return [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  };

  useEffect(() => {
    // Check if data already exists in localStorage
    const storedSessions = localStorage.getItem("sessions");
    if (!storedSessions) {
      localStorage.setItem("sessions", JSON.stringify(dummyData));
    }

    const sessionsToLoad = storedSessions
      ? JSON.parse(storedSessions)
      : dummyData;
    setSessions(sortSessions(sessionsToLoad));
    setIsInitialized(true);
  }, []);

  const addSession = (session: Session) => {
    const updatedSessions = sortSessions([...sessions, session]);
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
  };

  const updateSession = (id: string, updatedSession: Session) => {
    const updatedSessions = sortSessions(
      sessions.map((session) => (session.id === id ? updatedSession : session))
    );
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
  };

  const deleteSession = (id: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <SchedulerContext.Provider
      value={{
        sessions,
        addSession,
        updateSession,
        deleteSession,
        bookingVersion,
        setBookingVersion,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = () => {
  const context = useContext(SchedulerContext);
  if (context === undefined) {
    throw new Error("useScheduler must be used within a SchedulerProvider");
  }
  return context;
};
