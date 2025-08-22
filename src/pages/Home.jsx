import { CardList } from "../components/CardList.jsx";
import { useQuery } from '@tanstack/react-query';
import axios
 from "axios";
export const Home = () => {
     const {data, isLoading, error} = useQuery({
        queryKey: ['consulta a pokeapi desde home'],
        queryFn: async() => {
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
            return res.data.results
        }
    })
    return (
    <main 
    className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white"
    >
        <div 
        className="mx-auto w-full max-w-3xl">
            <h1 
            className="text-3xl font-bold text-center mb-8">
                REACT 19 - TEORIA
            </h1>
            {isLoading && 
            <p>
                Loading...
            </p>}
            {error && 
            <p>
                Error loading data.
            </p>}
            {!isLoading && !error && <CardList data={data} />}
        </div>
    </main>)
}