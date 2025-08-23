import { useForm } from "react-hook-form"
export const FormulariosPage = () => {
    const { 
        register,
         handleSubmit, 
         formState: { errors },
         } = useForm()
    const enviar = (data) => {

        alert(data.correo)
    }
    return (
        <main className="h-screen text-black flex flex-col gap-g p-4">
            <h1>
                Formularios Page
            </h1>
            <form onSubmit={handleSubmit(enviar)} 
            className="border p-2 flex flex-col gap-4">
                <section
                className="bg-amber-200 p-2">
                    <h2>
                        Validar Textos
                    </h2>
                    <input
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                        minLength: {
                            value: 3,
                            message: "Debe tener al menos 3 caracteres"
                        }
                    })}
                    className="p-2 border"
                    placeholder="Nombre"
                />
                <p>
                    {errors.nombre?.message}
                </p>
                </section>
                <section
                className="bg-amber-200 p-2">
                    <h2>
                        Validar Correos
                    </h2>
                    <input
                    {...register("correo", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: "Debe ser un correo válido"
                        }
                    })}
                    className="p-2 border"
                    placeholder="Correo"
                />
                <p>
                    {errors.correo?.message}
                </p>
                </section>
                <section
                className="bg-amber-200 p-2">
                    <h2>
                        Validar Numeros 
                    </h2>
                </section>
                <button
                type="submit"
                className="p-2 bg-black text-white ml-2 hover:bg-gray-800">
                    Enviar
                </button>
            </form>
        </main>
        
    )
}