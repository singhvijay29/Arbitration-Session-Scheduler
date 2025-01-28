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
  bookingVersion: number;
  setBookingVersion: (value: number | ((prev: number) => number)) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(
  undefined
);

// Move dummyData outside the component
const dummyData = [
  {
    id: "1737980000000",
    caseNumber: "70460",
    date: "2025-02-02",
    time: "16:11",
    duration: "45",
    arbitrator: "vijay",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "16:56",
  },
  {
    id: "1737980000001",
    caseNumber: "26980",
    date: "2025-01-31",
    time: "23:59",
    duration: "60",
    arbitrator: "vijay",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "00:59",
  },
  {
    id: "1737980000002",
    caseNumber: "57043",
    date: "2025-02-03",
    time: "21:17",
    duration: "15",
    arbitrator: "vijay",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "21:32",
  },
  {
    id: "1737980000003",
    caseNumber: "67962",
    date: "2025-02-02",
    time: "07:07",
    duration: "60",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "08:07",
  },
  {
    id: "1737980000004",
    caseNumber: "37525",
    date: "2025-02-03",
    time: "12:18",
    duration: "15",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "12:33",
  },
  {
    id: "1737980000005",
    caseNumber: "37628",
    date: "2025-01-31",
    time: "16:20",
    duration: "45",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "17:05",
  },
  {
    id: "1737980000006",
    caseNumber: "88440",
    date: "2025-02-03",
    time: "18:45",
    duration: "45",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "19:30",
  },
  {
    id: "1737980000007",
    caseNumber: "91216",
    date: "2025-02-01",
    time: "23:28",
    duration: "45",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "00:13",
  },
  {
    id: "1737980000008",
    caseNumber: "97616",
    date: "2025-01-29",
    time: "08:55",
    duration: "15",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "09:10",
  },
  {
    id: "1737980000009",
    caseNumber: "34846",
    date: "2025-02-02",
    time: "13:19",
    duration: "60",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "14:19",
  },
  {
    id: "1737980000010",
    caseNumber: "77543",
    date: "2025-01-30",
    time: "05:18",
    duration: "15",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "05:33",
  },
  {
    id: "1737980000011",
    caseNumber: "71647",
    date: "2025-02-04",
    time: "13:16",
    duration: "30",
    arbitrator: "vijay",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "13:46",
  },
  {
    id: "1737980000012",
    caseNumber: "39169",
    date: "2025-01-30",
    time: "19:11",
    duration: "15",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "19:26",
  },
  {
    id: "1737980000013",
    caseNumber: "59223",
    date: "2025-01-30",
    time: "16:23",
    duration: "15",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "16:38",
  },
  {
    id: "1737980000014",
    caseNumber: "5942",
    date: "2025-02-02",
    time: "10:14",
    duration: "30",
    arbitrator: "arun",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "10:44",
  },
  {
    id: "1737980000015",
    caseNumber: "62130",
    date: "2025-02-05",
    time: "08:46",
    duration: "30",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "09:16",
  },
  {
    id: "1737980000016",
    caseNumber: "53348",
    date: "2025-02-04",
    time: "19:54",
    duration: "30",
    arbitrator: "vijay",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "20:24",
  },
  {
    id: "1737980000017",
    caseNumber: "80278",
    date: "2025-01-31",
    time: "00:21",
    duration: "60",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "01:21",
  },
  {
    id: "1737980000018",
    caseNumber: "21885",
    date: "2025-02-01",
    time: "08:44",
    duration: "60",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "09:44",
  },
  {
    id: "1737980000019",
    caseNumber: "31014",
    date: "2025-01-31",
    time: "14:06",
    duration: "45",
    arbitrator: "singh",
    claimant: "singhvijay8529@gmail.com",
    respondent: "singhvijay8529@gmail.com",
    end_time: "14:51",
  },
];

// Add this helper function to handle localStorage updates
const updateLocalStorageWithEvent = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
};

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

  const updateLocalStorage = (sessions: Session[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
  };

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
