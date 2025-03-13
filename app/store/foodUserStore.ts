import { create } from 'zustand';
import { useProfileStore } from './profileStore';
import { Ingredient, useIncludeFoodStore } from './includeFoodStore';
import { useExcludeFoodStore } from './excludeFoodStore';

interface FoodStoreState {
  foods: Record<string, Ingredient[]>;
  selectedFoods: Ingredient[];
  open: boolean;
  fetchFoods: () => Promise<void>;
  toggleFoodSelection: (food: Ingredient) => void;
  saveSelectedFoods: (typeDrawer: string) => Promise<void>;
  setOpen: () => void;
}

export const useFoodStore = create<FoodStoreState>((set, get) => ({
  foods: {},
  selectedFoods: [],
  open: false,

  // Cargar alimentos desde la API
  fetchFoods: async () => {
    try {
      const res = await fetch('/api/foods');
      const data = await res.json();
      set({ foods: data.foods });
    } catch (error) {
      console.error('Error al obtener alimentos:', error);
    }
  },

  // Alternar selección de un alimento
  toggleFoodSelection: (food) => {
    set((state) => {
      const isSelected = state.selectedFoods.some((f) => f.id === food.id);
      return {
        selectedFoods: isSelected
          ? state.selectedFoods.filter((f) => f.id !== food.id)
          : [...state.selectedFoods, food]
      };
    });
  },

  // Guardar los alimentos seleccionados
  saveSelectedFoods: async (typeDrawer: string) => {
    const { profile } = useProfileStore.getState();
    const { ingredientsToInclude } = useIncludeFoodStore.getState();
    const { ingredientsToExclude } = useExcludeFoodStore.getState();
    if (!profile?.id) {
      console.error('Usuario no autenticado');
      return;
    }

    const insertFoods =
      typeDrawer === 'include' ? ingredientsToInclude : ingredientsToExclude;

    try {
      await fetch(`/api/${typeDrawer}-foods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          foodIds: insertFoods.map((f) => f.id)
        })
      });
      console.log('Alimentos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar alimentos:', error);
    }
  },
  setOpen: () => {
    set((state) => ({ open: !state.open }));
  }
}));
