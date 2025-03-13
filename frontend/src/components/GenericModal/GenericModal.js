import BackgroundFade from "../BackgroundFade/BackgroundFade";
import "./GenericModal.css"
import WidgetFullHeight from "../BaseWidgets/WidgetFullHeight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function GenericModal({ children, visible, onClose, fitContent = false, className = "" }) {

    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <BackgroundFade
            visible={visible}
            onClose={onClose}
        >
            <div className="w-[100vw] flex justify-center" onClick={onClose}>
                <div className={(fitContent ? 'inline' : 'w-[80vw]') + " m-auto " + className} onClick={handleModalClick}>
                    <WidgetFullHeight className="relative m-auto py-4 ">
                        <div className="relative w-full h-0">
                            <FontAwesomeIcon icon={faXmark} className="cursor-pointer absolute right-5 top-1 text-3xl font-semibold" onClick={onClose} />
                        </div>
                        {children}
                    </WidgetFullHeight>
                </div>
            </div>
        </BackgroundFade>
    );
}