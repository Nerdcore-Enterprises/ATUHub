import { useState, useEffect } from "react";

export default function ResponsiveView({mobileView = (<></>), desktopView = (<></>)}){
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    if (isMobile) return mobileView;
    else return desktopView;
}