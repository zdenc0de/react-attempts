import { useState } from "react";
import { Modal } from "./Modal.jsx";

export const Contador = () => {
    const [state, setState] = useState(false)
    return (
        <div className = "bg-amber-600 p-4 rounded-2xl">
            <h1 className = "title">Contador</h1>

            <button onClick = {() => setState(!state)} > {state?"Ocultar" : "Ver"}
            </button>

    {
        state && <Modal />
    }

        </div>
    );
}