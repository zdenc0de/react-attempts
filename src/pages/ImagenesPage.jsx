import imagenlocal from "../assets/imagen.jpg"
import {BtnVolver} from "../components/UI/buttons/BtnVolver"
import { useSearchParams } from "react-router-dom";
import { useMenuStore } from "../store/MenuStore";

export const ImagenesPage = () => {
    const {itemSelect} = useMenuStore()
    const [searchParams] = useSearchParams();
    const src = searchParams.get("src")
    return (
        <main
        className="max-w-3xl mx-auto p-6 space-y-10">
            <BtnVolver />
            <h1 
            className="text-3xl font-bold text-center">
                Imagenes con REACT
            </h1>
            {itemSelect?.title}
            {
               itemSelect?.to
            }
            <section className="space-y-2">
                <h2 
                className="text-xl font-semibold">
                    Imagen local importada
                </h2>
                <img 
                src={imagenlocal} 
                alt="imagen local" />
            </section>
            <section className="space-y-2">
                <h2 
                className="text-xl font-semibold">
                    Imagen desde internet
                </h2>
                <img 
                src={"https://blog.es.playstation.com/tachyon/sites/14/2052/02/784d7938bd3515de825b1cc9386bed3e392b1845-scaled.jpg"} 
                alt="imagen desde internet" />
            </section>
            <section className="space-y-2">
                <h2 
                className="text-xl font-semibold">
                    Imagen como fondo
                </h2>
                <div 
                className="flex h-64 bg-cover bg-center rounded-2xl items-center justify-center"
                style={{backgroundImage: "url('https://gamingbolt.com/wp-content/uploads/2023/09/Cyberpunk-2077-Update-2_01.jpg')"}}>
                <span
                className="bg-black/60 px-4 py-2 rounded-2xl text-white">
                    Fondo con texto encima
                </span>
                </div>
            </section>
            <section className="space-y-2">
                <h2 
                className="text-xl font-semibold">
                    Imagen Lazy Load
                </h2>
                <img 
                src={"https://blog.es.playstation.com/tachyon/sites/14/2052/02/784d7938bd3515de825b1cc9386bed3e392b1845-scaled.jpg"} 
                alt="imagen desde internet" 
                loading="lazy"
                />
            </section>
            <section className="space-y-2">
                <h2 
                className="text-xl font-semibold">
                    Imagen con search params
                </h2>
                <img 
                src={src} 
                alt="imagen local" />
            </section>
        </main>
    )
}