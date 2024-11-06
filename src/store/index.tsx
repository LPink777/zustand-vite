import { create } from "./zustand";

interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useCount = create<CountState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(() => ({ count: 0 })),
}));

export default useCount;
