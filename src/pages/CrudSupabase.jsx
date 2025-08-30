import { useQueryClient } from "@tanstack/react-query"
import { Icon } from "@iconify/react"
import { set, useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { 
    useEditarTareaMutation, 
    useEliminarTareasMutation, 
    useInsertarTareasMutation, 
    useMostrarTareasQuery,
    useEditarStateTareaMutation, 
    useBuscarTareasQuery} 
from "../tanstack/TareasStack"
import { useTareasStore } from "../store/TareasStore"
import { Modal } from "../components/Modal"

export const CrudSupabase = () => {
    const queryClient = useQueryClient()
    const { setItemSelect, stateModal, setStateModal, setAction, setBuscador } = useTareasStore() 
    const {
        register, 
        handleSubmit, 
        reset, 
        formState:{errors}, 
    } = useForm()

    const { data, isLoading, error} = useMostrarTareasQuery()
    const {data: databuscador, isLoading: isLoadingBuscador, error: errorBuscador} = useBuscarTareasQuery()
    const {mutate, isPending} = useInsertarTareasMutation(reset)
    const {mutate:mutateEliminar, isPending:isPendingEliminar} = useEliminarTareasMutation()
    const {mutate:mutateEditar, isPending:isPendingEditar} = useEditarStateTareaMutation()

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
                    onChange={(e) => setBuscador(e.target.value)} 
                        type="search"
                        className="border p-2 rounded-md focus:outline-none focus:border-0 focus:ring-2 focus:ring-amber-400"
                        placeholder="Escribe una tarea"
                    />
                        <button onClick = {() => {
                            setStateModal(true)
                            setAction("Nuevo")
                            setItemSelect(null)
                        }}
                        className="bg-amber-400 text-black font-bold px-4 py-2 rounded hover:bg-amber-300 cursor-pointer">
                            Agregar
                        </button>
                </div>
                
                <ul 
                className="flex flex-col gap-2">
                    {databuscador?.map((item, index) => (
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
                                    setItemSelect(item)
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