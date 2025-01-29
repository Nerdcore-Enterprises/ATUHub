
import { useState, useEffect } from "react";
import GenericModal from "../GenericModal/GenericModal";
import "./ResponsiveFullWidget.css"

export default function ResponsiveFullWidget({ children, onClose, visible }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])
    

    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <>
        {
            !isMobile &&
                <div className={"flex flex-col bg-white rounded-[2rem] px-2 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2 w-full m-0"} onClick={handleModalClick}>
                    <button className="absolute right-7 top-5 text-3xl font-semibold lg:hidden" onClick={onClose}>X</button>
                    {children}
                </div>
        }
        {
            isMobile &&
                <GenericModal visible={visible} onClose={onClose}>
                    {children}
                </GenericModal>
        }
        </>
    );
}
