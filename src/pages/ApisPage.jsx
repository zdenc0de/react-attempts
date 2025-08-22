import { useState, useEffect } from "react"

export const ApisPage = () => {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((res) => res.json())
        .then((data) => {
            setPokemons(data.results)
            console.log("data", data.results)
        })

    }, [])
    return (
        <div
        className="h-screen bg-amber-300 text-black">
               <span>
                   ApisPage
               </span>
               <section className="flex flex-col">
               {
                pokemons?.map((item, index) => (
                    <span 
                    key={index}>
                        {item.name}
                    </span>
                ))
               }
               </section>
        </div>
    )
}