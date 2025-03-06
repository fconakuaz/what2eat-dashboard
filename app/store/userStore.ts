import { create } from 'zustand';

export type UserRole = 'USER' | 'ADMIN';

interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  role: UserRole;
  country?: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'BANNED';
}

interface UserState {
  users: User[];
  currentPage: number;
  totalPages: number;
  fetchUsers: (page: number) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentPage: 1,
  totalPages: 1,

  fetchUsers: async (page) => {
    try {
      const response = await fetch(`/api/user?page=${page}`);
      const data = await response.json();

      set({
        users: data.users,
        currentPage: page,
        totalPages: data.totalPages
      });
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  },

  toggleUserStatus: async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'PATCH'
      });

      if (!response.ok) throw new Error('Error actualizando el estado');

      const updatedUser = await response.json();

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, status: updatedUser.status } : user
        )
      }));
    } catch (error) {
      console.error('Error cambiando el estado del usuario', error);
    }
  }
}));
