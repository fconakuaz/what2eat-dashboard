import { create } from 'zustand';
import { useProfileStore } from './profileStore';

interface ActivityRecord {
  id: string;
  startDateTime: string; //Se almacena en formato YYYY-MM-DD
  activityId: string;
  activity?: {
    id: string;
    includesSteps: boolean;
    name: string;
  };
  steps?: number;
  caloriesBurned?: number;
  distanceMeters?: number;
  activeMinutes?: number;
}

interface ActivityState {
  activities: { group: ActivityRecord[]; all: ActivityRecord[] };
  activityTypes: { id: string; name: string }[];
  fetchActivityTypes: () => Promise<void>;
  totalPages: number;
  currentPage: number;
  open: boolean;
  setOpen: () => void;
  setPage: (page: number) => void;
  fetchActivityRecords: (page: number) => Promise<void>;
  addActivity: (activity: Omit<ActivityRecord, 'id'>) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: { group: [], all: [] },
  totalPages: 1,
  currentPage: 1,
  open: false,
  activityTypes: [],

  // Cargar catálogo de actividades
  fetchActivityTypes: async () => {
    try {
      const res = await fetch('/api/activities');
      const data = await res.json();
      set({ activityTypes: data.activities });
    } catch (error) {
      console.error('Error al obtener actividades:', error);
    }
  },

  setPage: (page) => set({ currentPage: page }),

  setOpen: () => {
    const { open } = useActivityStore.getState();
    set({ open: !open });
  },

  fetchActivityRecords: async (page = 1) => {
    try {
      const { profile } = useProfileStore.getState();
      const res = await fetch(
        `/api/activities-user?page=${page}&user=${profile?.id}`
      );
      const data = await res.json();
      set({
        activities: data.activities,
        totalPages: data.totalPages,
        currentPage: page
      });
    } catch (error) {
      console.error('Error al obtener registros de actividad:', error);
    }
  },

  // Agregar nuevo registro de actividad
  addActivity: async (activity) => {
    const { profile } = useProfileStore.getState();
    const { fetchActivityRecords, setOpen } = useActivityStore.getState();

    if (profile?.id === undefined) {
      return;
    }
    try {
      const response = await fetch('/api/activities-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile?.id,
          activityId: activity.activityId,
          startDateTime: activity.startDateTime,
          steps: activity.steps ?? null,
          caloriesBurned: activity.caloriesBurned ?? null,
          distanceMeters: activity.distanceMeters ?? null,
          activeMinutes: activity.activeMinutes ?? null
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar actividad');
      }

      await fetchActivityRecords(1);
      setOpen();

      // Actualizar el estado con la nueva actividad
    } catch (error) {
      console.error('Error al registrar actividad:', error);
    }
  }
}));
