import { useForm } from "react-hook-form"
export const FormulariosPage = () => {
    const { register, handleSubmit } = useForm()
    const enviar = (data) => {
        console.log(data)
    }
    return (
        <main className="h-screen bg-amber-300 text-black flex flex-col">
            <h1>
                Formularios Page
            </h1>
            <form onSubmit={handleSubmit(enviar)}>
                <input {
                    ...register("nombre")
                }
                className="p-2 border" 
                placeholder="Nombre" />
                <button
                type="submit"
                className="p-2 bg-black text-white ml-2 hover:bg-gray-800">
                    Enviar
                </button>
            </form>
        </main>
        
    )
}