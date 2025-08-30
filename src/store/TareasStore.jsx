import { create } from "zustand"
import { supabase } from "../supabase/supabase.config"

const tabla = "tareas"
export const useTareasStore = create((set) => ({
    action:"Nueva", 
    setAction: (p) => {
        set({ action: p })
    },
    stateModal: false,
    setStateModal: (p) => {
        set({ stateModal: p })
    },
    itemSelect: null,
    setItemSelect: (p) => set({ itemSelect: p }),
    mostrarTareas: async() => {
        const {data, error} = await supabase.from(tabla).select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }, 
    buscador:"",
    setBuscador: (p) => set({buscador: p}),
    buscarTareas: async(p) => {
    const {data, error} = await supabase
        .from(tabla)
        .select()
        .ilike("nombre", `%${p.nombre}%`).order("id", { ascending: true })
    if (error) {
        throw new Error(error.message)
    }
    return data
}, 
    insertarTareas: async(p) => {
        const {error} = await supabase.from(tabla).insert(p)
        if(error) {
            throw new Error(error.message)
        }
    }, 
    editarTareas: async(p) => {
        const {error} = await supabase.from(tabla).update(p).eq("id", p.id)
        if(error) {
            throw new Error(error.message)
        }
    }, 
    eliminarTareas: async(p) => {
        const {error} = await supabase.from(tabla).delete().eq("id", p.id)
        if(error) {
            throw new Error(error.message)
        }
    }
}))