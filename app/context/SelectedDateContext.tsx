"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedDateContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const SelectedDateContext = createContext<SelectedDateContextType | undefined>(
  undefined
);

export const SelectedDateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error(
      "useSelectedDate must be used within a SelectedDateProvider"
    );
  }
  return context;
};
