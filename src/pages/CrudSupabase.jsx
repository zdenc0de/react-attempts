import { useQueryClient } from "@tanstack/react-query"
import { Icon } from "@iconify/react"
import { set, useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { useEditarTareaMutation, useEliminarTareasMutation, useInsertarTareasMutation, useMostrarTareasQuery } from "../tanstack/TareasStack"
import { useTareasStore } from "../store/TareasStore"

export const CrudSupabase = () => {
    const queryClient = useQueryClient()
    const { setItemSelect } = useTareasStore() 
    const {
        register, 
        handleSubmit, 
        reset, 
        formState:{errors}, 
    } = useForm()

    const { data, isLoading, error} = useMostrarTareasQuery() 
    const {mutate, isPending} = useInsertarTareasMutation(reset)
    const {mutate:mutateEliminar, isPending:isPendingEliminar} = useEliminarTareasMutation()
    const {mutate:mutateEditar, isPending:isPendingEditar} = useEditarTareaMutation()

    if (isLoading) {
        return <span>Cargando...</span>   
    }
    if (error ){
        return <span>error: {error.message}</span>
    }
    
    return (
        <main className="min-h-screen bg-amber-300 flex items-center justify-center p-4">
            <Toaster position="top-right" />
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-black mb-4">
                    Tareas - SUPABASE + REACT
                </h1>
                <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-2 mb-4">
                    <input 
                        {...register("nombre", { required: "La tarea es requerida" })}
                        type="text"
                        className="border p-2 rounded-md focus:outline-none focus:border-0 focus:ring-2 focus:ring-amber-400"
                        placeholder="Escribe una tarea"
                    />
                    {errors.nombre && 
                        <p className="text-red-500 text-sm mb-2">
                            {errors.nombre.message}
                        </p>
                    }
                    {isPending ? (
                        <span>Guardando...</span>
                    ) : (
                        <button className="bg-amber-400 text-black font-bold px-4 py-2 rounded hover:bg-amber-300 cursor-pointer">
                            Agregar
                        </button>
                    )}
                </form>
                
                <ul 
                className="flex flex-col gap-2">
                    {data?.map((item, index) => (
                        <li 
                            className="flex justify-between items-center p-3 bg-amber-100 rounded shadow-sm"
                            key={index}
                        >
                            <span onClick = {() => {
                                setItemSelect(item)
                                mutateEditar()
                            }}
                            className={`cursor-pointer flex-1 ${item.state ? "line-through text-gray-500": ""}`}>
                                {item.nombre}
                            </span>
                            <Icon onClick={() => {
                                setItemSelect(item)
                                mutateEliminar()
                            }}
                                icon="picon:skull" 
                                width="30" 
                                height="30" 
                                className="cursor-pointer" 
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}