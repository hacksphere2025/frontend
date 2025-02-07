import { create } from "zustand";

type Store = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useSessionStore = create<Store>()(set => ({
  token: null,
  setToken: (token: string) => set({ token: token }),
}));
