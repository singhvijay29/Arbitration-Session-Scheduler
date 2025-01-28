export type CalendarView = "day" | "week" | "month";

export type Event = {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
};
