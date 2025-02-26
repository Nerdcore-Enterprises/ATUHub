import { useState, useEffect } from "react";
import "./GenericModal.css"

export default function GenericModal({children, visible, onClose, fitContent = false, className = ""}){
    const [first, setFirst] = useState(false); // prevents fade away animation happening on page load

    useEffect(() => {
        if (visible && !first)
            setFirst(true);
    }, [visible, first])


    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <div className={"content-center modal-default z-10 fixed top-0 left-0 w-[100vw] h-[100vh] "+ (fitContent ? "" : " p-[10%] ") + (first ? (visible ? " visible-animation " : " hidden-animation ") : ' opacity-0 hidden ')} onClick={onClose}>
            <div className={"m-auto bg-white rounded-[2rem] px-2 " + (fitContent ? " w-fit " : " w-[100%] h-[100%] ") + "p-4 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] " + className} onClick={handleModalClick}>
                <div className="relative w-full h-0">
                    <button className="absolute right-5 top-1 text-3xl font-semibold" onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
}