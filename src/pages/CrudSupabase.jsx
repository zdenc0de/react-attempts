import { Icon } from "@iconify/react"
import { useForm } from "react-hook-form"
import { Toaster } from "sonner"
import { 
    useEliminarTareasMutation, 
    useMostrarTareasQuery,
    useEditarStateTareaMutation } 
from "../tanstack/TareasStack"
import { useTareasStore } from "../store/TareasStore"
import { Modal } from "../components/Modal"

export const CrudSupabase = () => {
    const { setItemSelect, stateModal, setStateModal, setAction } = useTareasStore() 
    const {
        register, 
    } = useForm()

    const { data, isLoading, error} = useMostrarTareasQuery() 
    const {mutate:mutateEliminar} = useEliminarTareasMutation()
    const {mutate:mutateEditar} = useEditarStateTareaMutation()

    if (isLoading) {
        return <span>Cargando...</span>   
    }
    if (error ){
        return <span>error: {error.message}</span>
    }
    
    return (
        <main className="min-h-screen bg-amber-300 flex items-center justify-center p-4">
            <Toaster position="top-right" />
            {
                stateModal && <Modal />
            }
            <div 
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h1 
                className="text-2xl font-bold text-center text-black mb-4">
                    Tareas - SUPABASE + REACT
                </h1>
                <div
                className="flex flex-col gap-2 mb-4">
                    <input 
                        {...register("nombre", { required: "La tarea es requerida" })}
                        type="text"
                        className="border p-2 rounded-md focus:outline-none focus:border-0 focus:ring-2 focus:ring-amber-400"
                        placeholder="Escribe una tarea"
                    />
                        <button onClick = {() => {
                            setStateModal(true)
                            setAction("Nuevo")
                        }}
                        className="bg-amber-400 text-black font-bold px-4 py-2 rounded hover:bg-amber-300 cursor-pointer">
                            Agregar
                        </button>
                </div>
                
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
                            <section
                            className="flex gap-2 items-center">
                                <Icon 
                                className="cursor-pointer"
                                icon="fluent:edit-32-filled" 
                                width="30" 
                                height="30"
                                onClick={() => {
                                    setStateModal(true)
                                    setAction("Editar")
                                } } />
                                <Icon 
                                onClick={() => {
                                setItemSelect(item)
                                mutateEliminar()
                            }}
                                icon="picon:skull" 
                                width="30" 
                                height="30" 
                                className="cursor-pointer" 
                            />
                            </section>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}