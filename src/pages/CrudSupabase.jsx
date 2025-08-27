import { useQuery, useMutation } from "@tanstack/react-query"
import { useTareasStore } from "../store/TareasStore"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"

export const CrudSupabase = () => {
    const {mostrarTareas, insertarTareas} = useTareasStore()
    const {
        register, 
        handleSubmit, 
        reset, 
        formState:{errors}, 
    } = useForm()
    const {data, error, isLoading} = useQuery({
        queryKey:["mostrar tareas"], 
        queryFn: mostrarTareas, 
    })
    const {mutate, isPending} = useMutation({
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
        }
    })

    if (isLoading) {
        return <span>Cargando...</span>   
    }
    if (error ){
        return <span>error: {error.message}</span>
    }
    return (
        <main
        className="min h-screen bg-amber-300 flex items-center justify-center p-4">
            <Toaster position="top-right" richColors/>
            <div
            className="bg-white p-6 rounded-xl shadow-xl w-full max-2-md">
                <h1
                className="text-2xl font-bold text-center text-black mb-4">
                    Tareas - SUPABASE + REACT
                </h1>
                <form onSubmit={handleSubmit()}
                className="flex gap-2 mb-4">
                    <input {...register("nombre", { required: "La tarea es requerida" })}
                    type="text"
                        className="flex-1 border p-2 rounded-md focus:outline-none focus:border-0 focus:ring-2 focus:ring-amber-400"
                        placeholder="Escribe una tarea"
                    />
                    { errors.nombre && 
                        <p 
                            className="text-red-500 text-sm mb-2">
                                {errors.nombre.message}
                        </p>
                    }
                    <button
                    className="bg-amber-400 text-black font-bold px-4 rounded hover:bg-amber-300 cursor-pointer">
                        Agregar
                    </button>
                </form>
                <ul
               className="flex flex-col">
                { data?.map((item, index) => {
                    return (<li 
                        className="flex justify-between items-center p-3 bg-amber-100 rounded shadow-sm"
                        key={index}>
                            <span
                            className={`cursor-pointer flex-1 ${item.state ? "line-through text-gray-500": ""}`}>
                                {item.nombre}
                            </span>
                            <Icon icon="picon:skull" width="30" height="30" 
                            className="cursor-pointer" />
                        </li>)
                })
               }
               </ul>
            </div>
               
        </main>
    )
}