import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

// Definimos el tipo de los valores nutricionales
type NutritionFact = {
  recipe_nutrition_fact_name: string;
  recipe_nutrition_fact_cant: string;
};

// Definimos el tipo de receta
type Recipe = {
  recipe_name: string;
  recipe_description: string;
  recipe_ingredients: string[];
  recipe_instructions: string[];
  recipe_time_preparation?: string;
  recipe_calories_cant?: string;
  recipe_protein_cant?: string;
  recipe_fat_cant?: string;
  recipe_full_nutrition_facts?: NutritionFact[];
};

// Definimos el estado para almacenar el menú
type MenuState = {
  breakfast: Recipe | null;
  snack1: Recipe | null;
  lunch: Recipe | null;
  snack2: Recipe | null;
  dinner: Recipe | null;
  saving: boolean;
  setSaving: (status: boolean) => void;
  setMenu: (newMenu: Partial<MenuState>) => void;
  updateMeal: (meal: keyof MenuState, data: Recipe) => void;
  resetMenu: () => void;
  saveDailyMenu: (userId: string) => Promise<void>;
};

// Creamos el store con Zustand, persistencia y Devtools
export const useMenuStore = create<MenuState>()(
  devtools(
    persist(
      (set, get) => ({
        breakfast: null,
        snack1: null,
        lunch: null,
        snack2: null,
        dinner: null,
        saving: false,

        // 🔹 Actualiza el estado de "saving"
        setSaving: (status) => set({ saving: status }),

        // Setea un nuevo menú
        setMenu: (newMenu) => set((state) => ({ ...state, ...newMenu })),

        // Actualiza una comida específica
        updateMeal: (meal, data) =>
          set((state) => ({
            ...state,
            [meal]: data
          })),

        saveDailyMenu: async (userId: string) => {
          const { breakfast, snack1, lunch, snack2, dinner } = get();
          set({ saving: true });

          try {
            const menuToSave = {
              userId,
              date: '2025-02-19', //new Date().toISOString(),
              breakfast,
              snack1,
              lunch,
              snack2,
              dinner
            };

            const response = await axios.post('/api/menu', menuToSave);
            console.log('✅ Menú guardado:', response.data);
          } catch (error) {
            console.error('❌ Error al guardar el menú:', error);
          } finally {
            set({ saving: false });
          }
        },

        // Resetea todo el menú
        resetMenu: () =>
          set({
            breakfast: null,
            snack1: null,
            lunch: null,
            snack2: null,
            dinner: null
          })
      }),
      {
        name: 'menu-store', // Nombre en localStorage
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'Menu' } // Nombre en Devtools
  )
);
