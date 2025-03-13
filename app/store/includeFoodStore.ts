import { create } from 'zustand';

export type Ingredient = {
  id: string;
  name: string;
  state: boolean; // true = incluir, false = no incluir
};

type IncludeFoodStore = {
  ingredientsToInclude: Ingredient[];
  fetchIncludedFoods: (userId: string) => Promise<void>;
  addIncludeIngredient: (ingredient: Ingredient) => void;
  removeIncludeIngredient: (ingredientName: string) => void;
  toggleIncludeIngredientState: (ingredientName: string) => void;
  resetIncludeIngredients: () => void;
  toggleIncludeFoodSelection: (food: Ingredient) => void;
};

export const useIncludeFoodStore = create<IncludeFoodStore>((set) => ({
  ingredientsToInclude: [],

  addIncludeIngredient: (ingredient) =>
    set((state) => ({
      ingredientsToInclude: [...state.ingredientsToInclude, ingredient]
    })),

  fetchIncludedFoods: async (userId) => {
    try {
      const response = await fetch(`/api/include-foods?userId=${userId}`);
      const data = await response.json();
      if (data.includeFoods) {
        set({
          ingredientsToInclude: data.includeFoods.map((food: any) => ({
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

  removeIncludeIngredient: (ingredientName) =>
    set((state) => ({
      ingredientsToInclude: state.ingredientsToInclude.filter(
        (ingredient) => ingredient.name !== ingredientName
      )
    })),

  toggleIncludeIngredientState: (ingredientName) =>
    set((state) => ({
      ingredientsToInclude: state.ingredientsToInclude.map((ingredient) =>
        ingredient.name === ingredientName
          ? { ...ingredient, state: !ingredient.state }
          : ingredient
      )
    })),

  toggleIncludeFoodSelection: (food) => {
    set((state) => {
      const isSelected = state.ingredientsToInclude.some(
        (f) => f.id === food.id
      );
      return {
        ingredientsToInclude: isSelected
          ? state.ingredientsToInclude.filter((f) => f.id !== food.id)
          : [...state.ingredientsToInclude, { ...food, state: true }]
      };
    });
  },

  resetIncludeIngredients: () =>
    set(() => ({
      ingredientsToInclude: []
    }))
}));
