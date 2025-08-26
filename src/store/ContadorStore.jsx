import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useContadorStore = create (
    persist(
        (set) => ({
            contador: 0, 
            incrementar: () => set((state) => ({contador: state.contador + 1})),
            resetear: () => set({contador: 0})
        }), {
            name: "contador-store"
        }
    )
)