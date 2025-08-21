import { useParams } from "react-router-dom";

export const PerfilPage = () => {
    const { id } = useParams();
    return (
        <div
        className="h-screen bg-amber-300 text-black">
            <span>
                PerfilPage ID Usuario: {id}
            </span>
        </div>
    )
}