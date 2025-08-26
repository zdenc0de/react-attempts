import { useContadorStore } from "../store/ContadorStore";

export const ZustandPage = () => {
    const {incrementar, contador} = useContadorStore();
    return (
        <div
        className="h-screen flex flex-col bg-amber-300 text-black gap-5 p-4">
               <span
               className="text-2xl font-bold">
                    Contador: {contador}
               </span>
               <button onClick={() => incrementar(contador)}
               className="bg-black text-white p-2 rounded-lg">
                    Incrementar 
               </button>
        </div>
    )
}