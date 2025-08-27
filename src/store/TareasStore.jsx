import { create } from "zustand"
import {supabase} from "../supabase/supabase.config"

const tabla = "tareas"
export const useTareasStore = create((set) => ({
    mostrarTareas: async() => {
        const {data, error} = await supabase.from(tabla).select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
}))