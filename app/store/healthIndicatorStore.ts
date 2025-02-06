import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HealthIndicatorUser = {
  id: string;
  userId: string;
  weight?: number;
  height?: number;
  bmi?: number;
  bodyType?: string;
  bodyFat?: number;
  bodyWater?: number;
  bodyProtein?: number;
  basalMetabolism?: number;
  visceralFat?: number;
  boneMass?: number;
  createdAt: Date;
  updatedAt: Date;
};

type HealthIndicatorState = {
  indicators: HealthIndicatorUser[];
  addHealthIndicator: (indicator: HealthIndicatorUser) => void;
  updateHealthIndicator: (
    id: string,
    updates: Partial<HealthIndicatorUser>
  ) => void;
  removeHealthIndicator: (id: string) => void;
};

export const useHealthIndicatorStore = create(
  persist<HealthIndicatorState>(
    (set) => ({
      indicators: [],

      addHealthIndicator: (indicator) =>
        set((state) => ({
          indicators: [
            ...state.indicators,
            { ...indicator, createdAt: new Date(), updatedAt: new Date() }
          ]
        })),

      updateHealthIndicator: (id, updates) =>
        set((state) => ({
          indicators: state.indicators.map((indicator) =>
            indicator.id === id
              ? { ...indicator, ...updates, updatedAt: new Date() }
              : indicator
          )
        })),

      removeHealthIndicator: (id) =>
        set((state) => ({
          indicators: state.indicators.filter(
            (indicator) => indicator.id !== id
          )
        }))
    }),
    {
      name: 'health-indicator-store' // Nombre de la clave en localStorage
    }
  )
);
