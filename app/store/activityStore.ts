import { create } from 'zustand';

interface ActivityRecord {
  id: string;
  date: string;
  steps: number;
  caloriesBurned: number;
  distanceMeters: number;
  activeMinutes: number;
  heartPoints: number;
  moveMinutes: number;
}

interface ActivityState {
  activities: ActivityRecord[];
  addActivity: (activity: Omit<ActivityRecord, 'id'>) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [
    {
      id: '1',
      date: '01/03/2024',
      steps: 8000,
      caloriesBurned: 350,
      distanceMeters: 5000,
      activeMinutes: 45,
      heartPoints: 30,
      moveMinutes: 60
    },
    {
      id: '2',
      date: '08/03/2024',
      steps: 8500,
      caloriesBurned: 380,
      distanceMeters: 5200,
      activeMinutes: 50,
      heartPoints: 35,
      moveMinutes: 65
    }
  ],

  addActivity: (activity) =>
    set((state) => ({
      activities: [
        ...state.activities,
        { ...activity, id: crypto.randomUUID() } // Generar un ID único
      ]
    }))
}));
