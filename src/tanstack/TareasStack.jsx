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
            queryClient.invalidateQueries({queryKey:["mostrar tareas"]})
           
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
            queryClient.invalidateQueries(["mostrar tareas"])
            toast.success("Tarea eliminada correctamente")
        }
    })
}
export const useEditarTareaMutation = () => {
    const {editarTareas, itemSelect} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Editar tarea"],
        mutationFn:async (data) => {
            const p = {
                id: itemSelect?.id,
                state: !itemSelect?.state,
                nombre: data.nombre,
            }
            await editarTareas(p)
        }, 
        onError: (error) => {
            toast.error("Error: " + error.message)
        },
        onSuccess:() => {
            toast.success("Tarea editada correctamente")
            queryClient.invalidateQueries(["mostrar tareas"])
        }
    })
}
export const useEditarStateTareaMutation = () => {
    const {editarTareas, itemSelect} = useTareasStore()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Editar tarea"],
        mutationFn:async (data) => {
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
            queryClient.invalidateQueries(["mostrar tareas"])
        }
    })
}