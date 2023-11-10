import { create } from "zustand";

type State = {
  gui: boolean;
};

type Action = {
  setGui: (gui: boolean) => void;
};

export const useGui = create<State & Action>((set, get) => ({
  gui: false,
  setGui: (gui: boolean) => set({ gui }),
}));

export const useProgress = create((set) => ({
  progress: 0,
  setProgress: (progress: number) => set({ progress }),
}));
