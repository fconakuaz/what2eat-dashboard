import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Preferences = {
  diet: number;
  program: number;
  includeFood: string[];
  excludeFood: string[];
};

type PreferencesStore = {
  preferences: Preferences;
  setPreferences: (updatedPreferences: Partial<Preferences>) => void;
};

export const usePreferencesStore = create(
  persist<PreferencesStore>(
    (set) => ({
      preferences: {
        diet: 0,
        program: 0,
        includeFood: [],
        excludeFood: []
      },
      setPreferences: (updatedPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...updatedPreferences }
        }))
    }),
    {
      name: 'preferences-store', // Name of the key in storage
      storage: createJSONStorage(() => localStorage) // Wrap localStorage
    }
  )
);
