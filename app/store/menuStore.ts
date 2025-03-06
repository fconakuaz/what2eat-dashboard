import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { useProfileStore } from './profileStore';
import { useCommonStore } from './commonStore';
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

// Tipo para los menús guardados
type SavedMenu = {
  id?: string;
  userId: string;
  date: string;
  breakfast: Recipe | null;
  snack1: Recipe | null;
  lunch: Recipe | null;
  snack2: Recipe | null;
  dinner: Recipe | null;
  createdAt: string;
  updatedAt: string;
};

// Definimos el estado para almacenar el menú
type MenuState = {
  idMenu?: string | null;
  breakfast: Recipe | null;
  snack1: Recipe | null;
  lunch: Recipe | null;
  snack2: Recipe | null;
  dinner: Recipe | null;
  savedMenus: SavedMenu[]; // Nuevo array para almacenar los menús guardados
  selectedSavedMenu: SavedMenu | null;
  saving: boolean;
  sharedMenu: SavedMenu | null;
  loadSharedMenu: (id: string) => void;
  setSaving: (status: boolean) => void;
  setMenu: (newMenu: Partial<MenuState>) => void;
  updateMeal: (meal: keyof MenuState, data: Recipe) => void;
  resetMenu: () => void;
  saveDailyMenu: () => Promise<void>;
  getSavedMenus: () => Promise<void>;
  setSavedMenu: (menuId: string) => void; // Nueva función
};

// Creamos el store con Zustand, persistencia y Devtools
export const useMenuStore = create<MenuState>()(
  devtools(
    persist(
      (set, get) => ({
        idMenu: null,
        breakfast: null,
        snack1: null,
        lunch: null,
        snack2: null,
        dinner: null,
        savedMenus: [], // Inicializamos el array vacío
        selectedSavedMenu: null,
        saving: false,
        sharedMenu: null,

        loadSharedMenu: async (id) => {
          try {
            const response = await fetch(`/api/shared/${id}`);
            const data = await response.json();
            set({ sharedMenu: data?.menu });
          } catch (error) {
            console.error('Error cargando el menú compartido', error);
          }
        },

        // Actualiza el estado de "saving"
        setSaving: (status) => set({ saving: status }),

        // Setea un nuevo menú
        setMenu: (newMenu) => set((state) => ({ ...state, ...newMenu })),

        // Actualiza una comida específica
        updateMeal: (meal, data) =>
          set((state) => ({
            ...state,
            [meal]: data
          })),

        // Guarda el menú diario en la BD
        saveDailyMenu: async () => {
          const { profile } = useProfileStore.getState();
          if (profile?.id === undefined) {
            return;
          }
          const { breakfast, snack1, lunch, snack2, dinner } = get();
          set({ saving: true });
          try {
            const menuToSave = {
              userId: profile?.id,
              date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
              breakfast,
              snack1,
              lunch,
              snack2,
              dinner
            };
            const resp = await axios.post('/api/menu', menuToSave);
            const { menu } = resp?.data;
            set({ idMenu: menu?.id });
          } catch (error) {
            console.error('❌ Error al guardar el menú:', error);
          } finally {
            set({ saving: false });
          }
        },

        // Obtiene los menús guardados de un usuario en una fecha específica
        getSavedMenus: async () => {
          const { profile } = useProfileStore.getState();
          const { selectedDate, setLoadingTrue, setLoadingFalse } =
            useCommonStore.getState();
          setLoadingTrue();
          set({ selectedSavedMenu: null });
          if (!profile.email || !selectedDate) {
            console.warn('⚠ No se pudo obtener el email o la fecha.');
            set({ savedMenus: [] });
          }

          const formattedDate = selectedDate?.toISOString().split('T')[0];

          try {
            const response = await axios.get(
              `/api/savedMenu?email=${profile?.email}&date=${formattedDate}`
            );

            if (response.data.success) {
              const formattedMenus = response?.data?.menus?.map(
                (menu: any) => ({
                  id: menu.id,
                  userId: menu.userId,
                  date: menu.date,
                  breakfast: menu.breakfast || null,
                  snack1: menu.snack1 || null,
                  lunch: menu.lunch || null,
                  snack2: menu.snack2 || null,
                  dinner: menu.dinner || null,
                  createdAt: menu.createdAt,
                  updatedAt: menu.updatedAt
                })
              );

              set({ savedMenus: formattedMenus });
            }
          } catch (error) {
            set({ savedMenus: [] }); // Si hay error, vaciamos la lista
          }
          setLoadingFalse();
        },

        // Guarda en `selectedSavedMenu` un menú por su ID
        setSavedMenu: (menuId: string) => {
          const { savedMenus } = get(); // Obtenemos los menús guardados
          const selectedMenu = savedMenus.find((menu) => menu.id === menuId); // Buscamos el menú por ID

          if (selectedMenu) {
            set({ selectedSavedMenu: selectedMenu });
          } else {
            console.warn('⚠ No se encontró el menú con ese ID.');
          }
        },

        // Resetea todo el menú
        resetMenu: () =>
          set({
            idMenu: null,
            breakfast: null,
            snack1: null,
            lunch: null,
            snack2: null,
            dinner: null,
            savedMenus: [],
            selectedSavedMenu: null
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
