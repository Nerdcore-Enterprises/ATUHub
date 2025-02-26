
import { useState, useEffect } from "react";
import GenericModal from "../GenericModal/GenericModal";
import "./ResponsiveFullWidget.css"

export default function ResponsiveFullWidget({ children, onClose, visible, className = "", mobileClass = "", desktopClass = ""}) {
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
                <div className={" sticky top-0 self-start w-full"} onClick={handleModalClick}>
                    <div className={"bg-white rounded-[2rem] px-2 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2 w-full m-0 h-[98vh] " + className + " " + desktopClass}>
                        {children}
                    </div>
                </div>
        }
        {
            isMobile &&
                <GenericModal visible={visible} onClose={onClose} className={className + " " + mobileClass}>
                    {children}
                </GenericModal>
        }
        </>
    );
}
