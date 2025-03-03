import { useState, useEffect } from "react";
import BackgroundFade from "../BackgroundFade/BackgroundFade";
import "./GenericModal.css"
import Widget from "../BaseWidgets/Widget";
import WidgetFullHeight from "../BaseWidgets/WidgetFullHeight";

export default function GenericModal({children, visible, onClose, fitContent = false, className = ""}){

    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <BackgroundFade
            visible={visible}
            onClose={onClose}
        >
            <div className="w-[100vw]" onClick={onClose}>
                <div className={"w-[80vw] m-auto " + className} onClick={handleModalClick}>
                    <WidgetFullHeight className="relative m-auto">
                        <div className="relative w-full h-0">
                            <button className="absolute right-5 top-1 text-3xl font-semibold" onClick={onClose}>X</button>
                        </div>
                        {children}
                    </WidgetFullHeight>
                </div>
            </div>
        </BackgroundFade>
    );
}