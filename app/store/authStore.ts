import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type User = {
  name?: string;
  email?: string;
  image?: string;
} | null;

type AuthState = {
  user: User;
  session: any;
  setUser: (user: User) => void;
  setSession: (session: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  // devtools(
  persist(
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
  // ,    { name: 'AuthStore' }  )
);
