import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  location?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  balance: number;
  login: () => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      balance: 0,
      login: () => set({ 
        isLoggedIn: true, 
        user: {
          name: "MD. Shahrial Amin",
          email: "shahrial741@gmail.com",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
          phone: "+880 1776-927073",
          location: "Dhaka, Bangladesh"
        },
        balance: 0.00
      }),
      logout: () => set({ isLoggedIn: false, user: null, balance: 0 }),
      updateBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);