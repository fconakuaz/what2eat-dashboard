import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Nutrition = {
  id: string;
  userId: string;
  waterIntakeMl: number;
  caloriesConsumed: number;
  carbohydratesG: number;
  proteinsG: number;
  fatsG: number;
  createdAt: Date;
};

type NutritionState = {
  nutritionRecords: Nutrition[];
  addNutritionRecord: (record: Nutrition) => void;
  updateNutritionRecord: (id: string, updates: Partial<Nutrition>) => void;
  removeNutritionRecord: (id: string) => void;
};

export const useNutritionUserIndicatorsStore = create(
  persist<NutritionState>(
    (set) => ({
      nutritionRecords: [],

      addNutritionRecord: (record) =>
        set((state) => ({
          nutritionRecords: [
            ...state.nutritionRecords,
            { ...record, createdAt: new Date() }
          ]
        })),

      updateNutritionRecord: (id, updates) =>
        set((state) => ({
          nutritionRecords: state.nutritionRecords.map((record) =>
            record.id === id ? { ...record, ...updates } : record
          )
        })),

      removeNutritionRecord: (id) =>
        set((state) => ({
          nutritionRecords: state.nutritionRecords.filter(
            (record) => record.id !== id
          )
        }))
    }),
    {
      name: 'nutrition-store' // Guardado en localStorage
    }
  )
);
