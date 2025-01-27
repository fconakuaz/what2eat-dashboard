import { create } from 'zustand';

type Ingredient = {
  name: string;
  state: boolean; // true = incluir, false = no incluir
};

type ExcludeFoodStore = {
  ingredientsToExclude: Ingredient[];
  addExcludeIngredient: (ingredient: Ingredient) => void;
  removeExcludeIngredient: (ingredientName: string) => void;
  toggleExcludeIngredientState: (ingredientName: string) => void;
  resetExcludeIngredients: () => void;
};

export const useExcludeFoodStore = create<ExcludeFoodStore>((set) => ({
  ingredientsToExclude: [
    {
      name: 'Cacahuates',
      state: true
    },
    {
      name: 'Harina',
      state: true
    },
    {
      name: 'Chayotes',
      state: true
    },
    {
      name: 'Pescado',
      state: true
    },
    {
      name: 'Mariscos',
      state: false
    }
  ],

  addExcludeIngredient: (ingredient) =>
    set((state) => ({
      ingredientsToExclude: [...state.ingredientsToExclude, ingredient]
    })),

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

  resetExcludeIngredients: () =>
    set(() => ({
      ingredientsToExclude: []
    }))
}));
