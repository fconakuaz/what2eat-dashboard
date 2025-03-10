import { create } from 'zustand';
import { useProfileStore } from './profileStore';

interface ActivityRecord {
  id: string;
  date: string; // 🔹 Se almacena en formato YYYY-MM-DD
  activityId: string;
  activityName: string; // 🔹 Se mostrará en la UI
  steps?: number;
  caloriesBurned?: number;
  distanceMeters?: number;
  activeMinutes?: number;
}

interface ActivityState {
  activities: ActivityRecord[];
  activityTypes: { id: string; name: string }[];
  fetchActivityTypes: () => Promise<void>;
  fetchActivityRecords: () => Promise<void>;
  addActivity: (
    activity: Omit<ActivityRecord, 'id' | 'activityName'>
  ) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],

  activityTypes: [],

  // 📌 Cargar catálogo de actividades
  fetchActivityTypes: async () => {
    try {
      const res = await fetch('/api/activities');
      const data = await res.json();
      set({ activityTypes: data.activities });
    } catch (error) {
      console.error('Error al obtener actividades:', error);
    }
  },

  // 📌 Cargar registros de actividad desde la API
  fetchActivityRecords: async () => {
    try {
      const res = await fetch('/api/activities-user');
      const data = await res.json();
      set({ activities: data.activities });
    } catch (error) {
      console.error('Error al obtener registros de actividad:', error);
    }
  },

  // 📌 Agregar nuevo registro de actividad
  addActivity: async (activity) => {
    console.log('🚩🚩🚩 activity 🚩🚩🚩');
    console.log(activity);
    const { profile } = useProfileStore.getState();
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
          date: activity.date,
          steps: activity.steps ?? null,
          caloriesBurned: activity.caloriesBurned ?? null,
          distanceMeters: activity.distanceMeters ?? null,
          activeMinutes: activity.activeMinutes ?? null
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar actividad');
      }

      const { activityUser } = await response.json();

      // Obtener el nombre de la actividad
      const activityName =
        useActivityStore
          .getState()
          .activityTypes.find((a) => a.id === activityUser.activityId)?.name ||
        'Desconocida';

      // Actualizar el estado con la nueva actividad
      set((state) => ({
        activities: [
          ...state.activities,
          {
            id: activityUser.id,
            date: activityUser.startDateTime.split('T')[0],
            activityId: activityUser.activityId,
            activityName,
            steps: activityUser.steps,
            caloriesBurned: activityUser.caloriesBurned,
            distanceMeters: activityUser.distanceMeters,
            activeMinutes: activityUser.activeMinutes
          }
        ]
      }));
    } catch (error) {
      console.error('Error al registrar actividad:', error);
    }
  }
}));
