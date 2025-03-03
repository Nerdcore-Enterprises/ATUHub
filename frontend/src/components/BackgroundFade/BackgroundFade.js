import { useState, useEffect } from "react";

export default function BackgroundFade({children, visible, onClose = () => {}}){
    const [first, setFirst] = useState(false); // prevents fade away animation happening on page load

    useEffect(() => {
        if (visible && !first)
            setFirst(true);
    }, [visible, first])

    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <div className={"content-center modal-default z-10 fixed top-0 left-0 w-[100vw] h-[100vh] "+ (first ? (visible ? " visible-animation " : " hidden-animation ") : ' opacity-0 hidden ')} onClick={onClose}>
            <div onClick={handleModalClick} className="inline-block">
                {children}
            </div>
        </div>
    );
}