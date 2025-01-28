export interface Session {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  duration: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
  end_time: string;
}

export type CalendarView = 'day' | 'week' | 'month';

export type Role = 'arbitrator' | 'user';

export interface Toast {
  message: string;
  type: 'success' | 'error';
} 