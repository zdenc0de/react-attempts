import { NavLink } from "react-router-dom"

export const RutasAnidadasPage = () => {
    return (
        <div
        className="p-6 max-w-2xl mx-auto space-y-6">
            <h2
            className="text-3xl font-bold text-center">
                Panel de Usuario
            </h2>
            <nav 
            className="flex gap-4 justify-center">
                <NavLink to="perfil">
                    Perfil
                </NavLink>
                <NavLink to="configuracion">
                    Configuracion
                </NavLink>
            </nav>
        </div>
    )
}