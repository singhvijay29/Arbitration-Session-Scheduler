"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

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
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(
  undefined
);

export const SchedulerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load data from localStorage only after component mounts
    const storedSessions = localStorage.getItem("sessions");
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
    setIsInitialized(true);
  }, []);

  const updateLocalStorage = (sessions: Session[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
  };

  const addSession = (session: Session) => {
    const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    updateLocalStorage(updatedSessions);
  };

  const updateSession = (id: string, updatedSession: Session) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? updatedSession : session
    );
    setSessions(updatedSessions);
    updateLocalStorage(updatedSessions);
  };

  const deleteSession = (id: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    setSessions(updatedSessions);
    updateLocalStorage(updatedSessions);
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <SchedulerContext.Provider
      value={{ sessions, addSession, updateSession, deleteSession }}
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
