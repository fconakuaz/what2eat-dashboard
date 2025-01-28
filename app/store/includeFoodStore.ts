import { create } from 'zustand';

type Ingredient = {
  name: string;
  state: boolean; // true = incluir, false = no incluir
};

type IncludeFoodStore = {
  ingredientsToInclude: Ingredient[];
  addIncludeIngredient: (ingredient: Ingredient) => void;
  removeIncludeIngredient: (ingredientName: string) => void;
  toggleIncludeIngredientState: (ingredientName: string) => void;
  resetIncludeIngredients: () => void;
};

export const useIncludeFoodStore = create<IncludeFoodStore>((set) => ({
  ingredientsToInclude: [
    {
      name: 'Cebolla',
      state: true
    },
    {
      name: 'Tomate',
      state: true
    },
    {
      name: 'Pimientos',
      state: true
    },
    {
      name: 'Pollo',
      state: true
    },
    {
      name: 'Calabacitas',
      state: false
    },
    {
      name: 'Champiñones',
      state: true
    },
    {
      name: 'Queso de hebra',
      state: true
    },
    {
      name: 'Huevos',
      state: true
    },
    {
      name: 'Claras de huevo',
      state: true
    }
  ],

  addIncludeIngredient: (ingredient) =>
    set((state) => ({
      ingredientsToInclude: [...state.ingredientsToInclude, ingredient]
    })),

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

  resetIncludeIngredients: () =>
    set(() => ({
      ingredientsToInclude: []
    }))
}));
