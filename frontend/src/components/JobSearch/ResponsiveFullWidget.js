
import { useState, useEffect } from "react";
import GenericModal from "../GenericModal/GenericModal";
import ResponsiveView from "../ResponsiveView";
import "./ResponsiveFullWidget.css"
import StickyWidget from "../BaseWidgets/StickyWidget";

export default function ResponsiveFullWidget({ children, onClose, visible, className = ""}) {

    const handleModalClick = (event) => {
        event.stopPropagation();
    }

    return (
        <ResponsiveView
            mobileView={
                <GenericModal visible={visible} onClose={onClose} className={className}>
                    {children}
                </GenericModal>
            }
            desktopView={
                <StickyWidget className="h-[90vh]">
                    {children}
                </StickyWidget>
            }
        />
    );
}
