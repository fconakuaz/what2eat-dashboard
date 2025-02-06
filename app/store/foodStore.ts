import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FoodCategory =
  | 'FRUITS'
  | 'VEGETABLES'
  | 'GRAINS'
  | 'PROTEINS'
  | 'DAIRY'
  | 'LEGUMES'
  | 'NUTS_SEEDS'
  | 'FATS_OILS'
  | 'SWEETS_DESSERTS'
  | 'BEVERAGES'
  | 'HERBS_SPICES';

type Food = {
  id: string;
  name: string;
  category?: FoodCategory; // Se asume que FoodCategory es un string
};

type FoodState = {
  foods: Food[];
  addFood: (food: Food) => void;
  updateFood: (id: string, updates: Partial<Food>) => void;
  removeFood: (id: string) => void;
};

export const useFoodStore = create(
  persist<FoodState>(
    (set) => ({
      foods: [],

      addFood: (food) =>
        set((state) => ({
          foods: [...state.foods, food]
        })),

      updateFood: (id, updates) =>
        set((state) => ({
          foods: state.foods.map((food) =>
            food.id === id ? { ...food, ...updates } : food
          )
        })),

      removeFood: (id) =>
        set((state) => ({
          foods: state.foods.filter((food) => food.id !== id)
        }))
    }),
    {
      name: 'food-store' // Guardado en localStorage
    }
  )
);
