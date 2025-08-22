import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from "axios"

export const ApisPage = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['consulta a pokeapi'],
        queryFn: async() => {
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
            return res.data.results
        }
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

    {/*
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((res) => res.json())
        .then((data) => {
            setPokemons(data.results)
            setCargando(false)
            console.log("data", data.results)
        }).catch((error) => {
            console.error("Error fetching data:", error)
            setCargando(false)
        })
    }, [])
    */}

    return (
        <div className="h-screen bg-amber-300 text-black">
            <span>
                ApisPage
            </span>
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