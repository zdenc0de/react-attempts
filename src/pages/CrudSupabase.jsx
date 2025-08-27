import { useQuery } from "@tanstack/react-query"
import { useTareasStore } from "../store/TareasStore"

export const CrudSupabase = () => {
    const {mostrarTareas} = useTareasStore()
    const {data, error, isLoading} = useQuery({
        queryKey:["mostrar tareas"], 
        queryFn: mostrarTareas, 
    })
    if (isLoading) {
        return <span>Cargando...</span>   
    }
    if (error ){
        return <span>error: {error.message}</span>
    }
    return (
        <div
        className="h-screen bg-amber-300 text-black">
               <span>
                   CrudSupabase
               </span>
               <section
               className="flex flex-col gap-2">
                {
                data?.map((item, index) => {
                    return (<span key={index}>{item.nombre}</span>)
                })
               }
               </section>
        </div>
    )
}