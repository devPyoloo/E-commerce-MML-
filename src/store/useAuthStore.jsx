import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      roles: [],
      isAuthenticated: false,
      setAuth: ({ user, accessToken, refreshToken, roles }) =>
        set({ user, accessToken, refreshToken, roles, isAuthenticated: true }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          roles: [],
          isAuthenticated: false,
        }),

      setIsAuthenticated: () =>
        set((state) => ({ isAuthenticated: !state.isAuthenticated })),
    }),
    {
      name: "authTokens",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        roles: state.roles,
      }),
    }
  )
);
