import { create } from "zustand";
import { useRef } from "react";

import { RefObject } from "react";

interface ScrollControlsRefType extends RefObject<HTMLElement> {
  // You can add any methods or properties that ScrollControls exposes
  // scrollTo?: (offset: number) => void;
}

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

interface ProgressStore {
  pages: number;
  progress: number;
  interact: boolean;
  scrollTo: number;
  scrollControlsRef: ScrollControlsRefType;
  currentProgress: number;
  setProgress: (progress: number) => void;
  setInteract: (interact: boolean) => void;
  setScrollControlsRef: (ref: ScrollControlsRefType) => void;
  setCurrentProgress: (currentProgress: number) => void;
}

export const useProgress = create<ProgressStore>((set) => ({
  pages: 4,
  progress: 0,
  interact: false,
  scrollTo: 0,
  scrollControlsRef: { current: null },
  currentProgress: 0,
  setProgress: (progress: number) => set({ progress }),
  setInteract: (interact: boolean) => set({ interact }),
  setScrollControlsRef: (ref) => set({ scrollControlsRef: ref }),
  setScrollTo: (scrollTo: number) => set({ scrollTo }),
  setCurrentProgress: (currentProgress: number) => set({ currentProgress }),
}));
