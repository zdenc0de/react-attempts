import { create } from "zustand";

export const useContadorStore = create((set) => ({
    contador: 0, 
    incrementar: (p) => set((state) => ({contador: state.contador + 1})), 
    resetear: () => set({contador: 0})
}))