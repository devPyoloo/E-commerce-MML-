import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setIsAuthenticated: () => set((state) => ({ isAuthenticated: !state.isAuthenticated }))
    }),
    {
      name: "authTokens",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
