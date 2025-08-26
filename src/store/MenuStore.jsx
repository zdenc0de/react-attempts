import { create } from 'zustand'
export const useMenuStore = create((set) => 
({
itemSelect: null,
setItemSelect: (p) => set({ itemSelect: p })
}))