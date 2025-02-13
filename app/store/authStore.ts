import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
  image: string;
} | null;

type AuthState = {
  user: User;
  session: any;
  setUser: (user: User) => void;
  setSession: (session: any) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session, user: session?.user || null }),
      logout: () => set({ user: null, session: null })
    }),
    {
      name: 'auth-storage'
    }
  )
);
