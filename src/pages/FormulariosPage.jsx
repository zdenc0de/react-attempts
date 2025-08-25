import { useForm } from "react-hook-form"
export const FormulariosPage = () => {
    const { 
        register,
         handleSubmit, 
         formState: { errors }, watch, reset
         } = useForm({
            defaultValues: {
                nombre: "",
                correo: "",
                edad: 0
            }
         })
    const enviar = (data) => {

        alert(data.correo)
    }
    return (
        <main className="h-screen text-black flex flex-col gap-5 p-4">
            <h1>
                Formularios Page {watch("nombre")}
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
                    <input type="number" {...register("edad", {
                        required: "La edad es obligatoria",
                        valueAsNumber: true,
                        min: {
                            value: 18, 
                            message: "Debe ser mayor a 18"
                        },
                        max: {
                            value: 99, 
                            message: "Edad maxima permitida 99"
                        }
                    })} 
                    placeholder="Ej: 25"
                    />
                    <p>
                        {errors.edad?.message}
                    </p>
                </section>
                <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white hover:bg-indigo-700">
                    Enviar
                </button>
            </form>
            <button
                onClick={() => reset()}
                type="button"
                className="px-4 py-2 rounded bg-black text-white hover:bg-indigo-700">
                    Resetear
                </button>
        </main>
        
    )
}