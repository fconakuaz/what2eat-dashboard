import { create } from 'zustand';
import { useProfileStore } from './profileStore';

interface Food {
  id: string;
  name: string;
}

interface FoodStoreState {
  foods: Record<string, Food[]>; // Alimentos agrupados por categoría
  selectedFoods: Food[]; // Alimentos seleccionados
  fetchFoods: () => Promise<void>;
  toggleFoodSelection: (food: Food) => void;
  saveSelectedFoods: () => Promise<void>;
}

export const useIncludeFoodStore = create<FoodStoreState>((set, get) => ({
  foods: {},
  selectedFoods: [],

  // 📌 Cargar alimentos desde la API
  fetchFoods: async () => {
    try {
      const res = await fetch('/api/foods');
      const data = await res.json();
      set({ foods: data.foods });
    } catch (error) {
      console.error('Error al obtener alimentos:', error);
    }
  },

  // 📌 Alternar selección de un alimento
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

  // 📌 Guardar los alimentos seleccionados
  saveSelectedFoods: async () => {
    const { profile } = useProfileStore.getState();
    if (!profile?.id) {
      console.error('Usuario no autenticado');
      return;
    }

    try {
      await fetch('/api/include-foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          foodIds: get().selectedFoods.map((f) => f.id)
        })
      });
      console.log('Alimentos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar alimentos:', error);
    }
  }
}));
