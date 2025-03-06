import { create } from 'zustand';

interface HealthRecord {
  date: string;
  weight: number;
  bodyMassIndex: number;
}

interface HealthState {
  records: HealthRecord[];
  addRecord: (record: HealthRecord) => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  records: [
    { date: '01/03/2024', weight: 80, bodyMassIndex: 25.2 },
    { date: '08/03/2024', weight: 79.5, bodyMassIndex: 24.9 },
    { date: '15/03/2024', weight: 79, bodyMassIndex: 24.7 },
    { date: '22/03/2024', weight: 78.5, bodyMassIndex: 24.5 },
    { date: '29/03/2024', weight: 78, bodyMassIndex: 24.3 }
  ],

  addRecord: (record) =>
    set((state) => ({ records: [...state.records, record] }))
}));
