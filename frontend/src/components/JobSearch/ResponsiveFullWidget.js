import GenericModal from "../GenericModal/GenericModal";
import ResponsiveView from "../ResponsiveView";
import "./ResponsiveFullWidget.css"
import StickyWidget from "../BaseWidgets/StickyWidget";

export default function ResponsiveFullWidget({ children, onClose, visible, className = "" }) {

    return (
        <ResponsiveView
            mobileView={
                <GenericModal visible={visible} onClose={onClose} className={className}>
                    {children}
                </GenericModal>
            }
            desktopView={
                <StickyWidget className="min-h-[90vh] py-4 ">
                    {children}
                </StickyWidget>
            }
        />
    );
}
