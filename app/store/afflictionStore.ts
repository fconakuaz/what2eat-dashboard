import { create } from 'zustand';

export type Affliction = {
  id: string;
  name: string;
};

type AfflictionState = {
  afflictions: Affliction[];
  addAffliction: (newAffliction: Affliction) => void;
  removeAffliction: (id: string) => void;
  updateAffliction: (id: string, name: string) => void;
};

export const useAfflictionStore = create<AfflictionState>((set) => ({
  afflictions: [],

  addAffliction: (newAffliction) =>
    set((state) => ({
      afflictions: [...state.afflictions, newAffliction]
    })),

  removeAffliction: (id) =>
    set((state) => ({
      afflictions: state.afflictions.filter(
        (affliction) => affliction.id !== id
      )
    })),

  updateAffliction: (id, name) =>
    set((state) => ({
      afflictions: state.afflictions.map((affliction) =>
        affliction.id === id ? { ...affliction, name } : affliction
      )
    }))
}));
