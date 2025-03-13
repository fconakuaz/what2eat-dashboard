import { create } from 'zustand';
import { Ingredient } from './includeFoodStore';

type ExcludeFoodStore = {
  ingredientsToExclude: Ingredient[];
  fetchExcludedFoods: (userId: string) => Promise<void>;
  addExcludeIngredient: (ingredient: Ingredient) => void;
  removeExcludeIngredient: (ingredientName: string) => void;
  toggleExcludeIngredientState: (ingredientName: string) => void;
  resetExcludeIngredients: () => void;
  toggleExcludeFoodSelection: (food: Ingredient) => void;
};

export const useExcludeFoodStore = create<ExcludeFoodStore>((set) => ({
  ingredientsToExclude: [],

  addExcludeIngredient: (ingredient) =>
    set((state) => ({
      ingredientsToExclude: [...state.ingredientsToExclude, ingredient]
    })),

  fetchExcludedFoods: async (userId) => {
    try {
      const response = await fetch(`/api/exclude-foods?userId=${userId}`);
      const data = await response.json();
      if (data.includeFoods) {
        set({
          ingredientsToExclude: data.includeFoods.map((food: any) => ({
            id: food.id,
            name: food.name,
            state: true
          }))
        });
      }
    } catch (error) {
      console.error('Error al obtener alimentos incluidos:', error);
    }
  },

  removeExcludeIngredient: (ingredientName) =>
    set((state) => ({
      ingredientsToExclude: state.ingredientsToExclude.filter(
        (ingredient) => ingredient.name !== ingredientName
      )
    })),

  toggleExcludeIngredientState: (ingredientName) =>
    set((state) => ({
      ingredientsToExclude: state.ingredientsToExclude.map((ingredient) =>
        ingredient.name === ingredientName
          ? { ...ingredient, state: !ingredient.state }
          : ingredient
      )
    })),

  toggleExcludeFoodSelection: (food) => {
    set((state) => {
      const isSelected = state.ingredientsToExclude.some(
        (f) => f.id === food.id
      );
      return {
        ingredientsToExclude: isSelected
          ? state.ingredientsToExclude.filter((f) => f.id !== food.id)
          : [...state.ingredientsToExclude, { ...food, state: true }]
      };
    });
  },

  resetExcludeIngredients: () =>
    set(() => ({
      ingredientsToExclude: []
    }))
}));
