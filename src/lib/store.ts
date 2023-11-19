import { create } from "zustand";

type State = {
  gui: boolean;
  loading: boolean;
};

type Action = {
  setGui: (gui: boolean) => void;
  setLoading: (loading: boolean) => void;
};

export const useGui = create<State & Action>((set) => ({
  gui: false,
  loading: true,
  setGui: (gui: boolean) => set({ gui }),
  setLoading: (loading: boolean) => set({ loading }),
}));
