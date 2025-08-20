import { useEffect, useState } from "react"
import { BtnVolver } from "../components/UI/buttons/BtnVolver"

export const UseEffectPage = () => {
    const [segundos, setSegundos] = useState(0);
    useEffect(()=> {
        const intervalo = setInterval(() => {
            setSegundos((s) => s+1)
        }, 1000)
        return () => clearInterval(intervalo);
    }, [])
    return (
        <div
        className="h-screen bg-amber-300 text-black flex flex-col justify-center items-center">
            <BtnVolver />
                <h2 
                className="text-3xl font-bold mb-6">
                    UseEffectPage
                </h2>
                <div 
                className="w-48 h-49 rounded-full bg-white border-8 border-[black
                ] flex items-center justify-center shadow-lg">
                   <span className="text-4xl font-semibold">{segundos}
                    </span> 
                </div>
        </div>
    )
}