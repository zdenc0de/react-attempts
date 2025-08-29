import { Icon } from "@iconify/react"
import { useForm } from "react-hook-form"
import { useInsertarTareasMutation, useEditarTareaMutation } from "../tanstack/TareasStack"
import { useTareasStore } from "../store/TareasStore"
import { useEffect } from "react"

export const Modal = () => {
    const { setStateModal, action, itemSelect } = useTareasStore() 

    const {
        register, 
        handleSubmit, 
        reset,
        setValue, 
        formState:{errors}, 
    } = useForm({defaultValues:{
        nombre: itemSelect?.nombre
    }})
    
    const {mutate:mutateInsertar, isPending: isPendingInsertar} = useInsertarTareasMutation(reset)
    const { mutate:mutateEditar, isPending: isPendingEditar} = useEditarTareaMutation()

    useEffect(() => {
        if (action === "Editar" && itemSelect) {
            setValue("nombre", itemSelect.nombre)
        } else {
            setValue("nombre", "")
        }
    }, [action, itemSelect, setValue])

    const isPending = isPendingInsertar || isPendingEditar

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between mb-4"> 
                    <span className="font-bold text-2xl">
                        {action === "Editar" ? "Editar" : "Agregar"} Tarea
                    </span>
                    <Icon 
                        onClick={() => {
                        setStateModal(false)
                        reset() 
                    }}
                        className="cursor-pointer" 
                        icon="carbon:close-outline" 
                        width="32" 
                        height="32" 
                    />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(
                    action === "Nuevo" ? mutateInsertar : mutateEditar 
                )}>
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
                    <div className="mx-auto">
                        {isPending ? (
                            <span>Guardando...</span>
                        ) : (
                            <button 
                                type="submit"
                                className="bg-amber-400 text-black font-bold px-4 py-2 rounded hover:bg-amber-300 cursor-pointer">
                                {action === "Editar" ? "Actualizar" : "Agregar"} 
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}