import { create } from "zustand";

type State = {
  gui: boolean;
};

type Action = {
  setGui: (gui: boolean) => void;
};

export const useStore = create<State & Action>((set, get) => ({
  gui: true,
  setGui: (gui: boolean) => set({ gui }),
}));
