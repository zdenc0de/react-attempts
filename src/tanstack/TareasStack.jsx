import { useTareasStore } from "../store/TareasStore"
import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMostrarTareasQuery = () => {
    const {mostrarTareas} = useTareasStore()
     return useQuery ({
        queryKey:["mostrar tareas"], 
        queryFn: mostrarTareas, 
    })
}

export const useBuscarTareasQuery = () => {
    const {buscarTareas, buscador} = useTareasStore()
     return useQuery ({
        queryKey:["buscar tareas", buscador], // ✅ Simplificado
        queryFn: () => buscarTareas({nombre: buscador}), 
        enabled: true // ✅ Asegurar que siempre esté habilitado
    })
}

export const useInsertarTareasMutation = (reset) => {
    const {insertarTareas, setStateModal} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey:["Insertar tarea"],
        mutationFn: async(data) => {
            const p = {
                nombre: data.nombre 
            }
            await insertarTareas(p)
        }, 
        onError: (error) => {
            toast.error("Error: " + error.message)
        }, 
        onSuccess:() => {
            toast.success("Tarea insertada correctamente")
            reset()
            setStateModal(false)
            // ✅ Invalidar ambas queries
            queryClient.invalidateQueries({queryKey:["mostrar tareas"]})
            queryClient.invalidateQueries({queryKey:["buscar tareas"]})
        }
    })
}

export const useEliminarTareasMutation = () => {
    const {eliminarTareas, itemSelect} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Eliminar tarea"], 
        mutationFn: async () => {
            const p = {
                id: itemSelect?.id, 
            }
            await eliminarTareas(p)
        }, 
        onError: (error) => {
            toast.error("Error: " + error.message)
        },
        onSuccess:() => {
            // ✅ Invalidar ambas queries
            queryClient.invalidateQueries(["mostrar tareas"])
            queryClient.invalidateQueries(["buscar tareas"])
            toast.success("Tarea eliminada correctamente")
        }
    })
}

export const useEditarTareaMutation = () => {
    const {editarTareas, itemSelect, setStateModal} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Editar tarea"],
        mutationFn:async (data) => {
            const p = {
                id: itemSelect?.id,
                nombre: data.nombre, 
            }
            await editarTareas(p)
        }, 
        onError: (error) => {
            toast.error("Error: " + error.message)
        },
        onSuccess:() => {
            toast.success("Tarea editada correctamente")
            setStateModal(false)
            // ✅ Invalidar ambas queries 
            queryClient.invalidateQueries(["mostrar tareas"])
            queryClient.invalidateQueries(["buscar tareas"])
        }
    })
}

export const useEditarStateTareaMutation = () => {
    const {editarTareas, itemSelect} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Editar estado tarea"], // ✅ Cambiar key para evitar conflictos
        mutationFn:async () => {
            const p = {
                id: itemSelect?.id,
                state: !itemSelect?.state,
            }
            await editarTareas(p)
        }, 
        onError: (error) => {
            toast.error("Error: " + error.message)
        },
        onSuccess:() => {
            toast.success("Tarea editada correctamente")
            // ✅ Invalidar ambas queries
            queryClient.invalidateQueries(["mostrar tareas"])
            queryClient.invalidateQueries(["buscar tareas"])
        }
    })
}