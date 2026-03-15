export type ShiftType = 'day' | 'night';

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  badge: string;
  role: string;
  active: boolean;
  trainings: string[];
  photoUrl?: string;
};

export type Assignment = {
  employeeId: string;
  zoneId: string;
  slotId?: string;
  role?: string;
};

export type ShiftPlan = {
  id: string; // np. 2026-03-15_day
  date: string; // YYYY-MM-DD
  shiftType: ShiftType;
  presentEmployeeIds: string[];
  assignments: Assignment[];
  createdAt: string;
  updatedAt: string;
};