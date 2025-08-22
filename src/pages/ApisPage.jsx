import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from "axios"

export const ApisPage = () => {
    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ['consulta a pokeapi'],
        queryFn: async() => {
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
            return res.data.results
        },
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 10000, // Refetch data every 10 seconds
    })
    if (isLoading) return (
        <span>
            Cargando...
        </span>
    )

    if (error) return (
        <span>
            Error: {error.message}
        </span>
    )

    return (
        <div className="h-screen bg-amber-300 text-black">
            <span>
                ApisPage
            </span>
            <button 
            className="bg-black text-white"
            onClick={() => refetch()}>
                Click a refetch
            </button>
            <section 
            className="flex flex-col">
                {data?.map((item, index) => {
                    return (
                        <span key={index}>
                            {item.name}
                        </span>
                    )
                })}
               </section>
        </div>
    )
}