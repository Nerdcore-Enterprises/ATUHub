import BackgroundFade from "../BackgroundFade/BackgroundFade";
import ContentDiv from "../WidgetContainers/ContentDiv";
import './GenericSidebar.css'

export default function GenericSidebar({children, open, setOpen, side = 'left', minSize = '0%', maxSize = '80%', className = ""}){

    const handleBackgroundClick = (event) => {
        if (open) {
            setOpen(false);
        }
        else {
            event.stopPropagation();
        }
    }

    return (
        <>
            <BackgroundFade visible={open} onClose={handleBackgroundClick} />
            <div 
                className={(open ? side + '-open ' : side + '-closed ') + side + " m-0 p-0 fixed top-0 z-[10000]"}
                style={{minWidth: minSize, maxWidth: maxSize}}
            >
                <ContentDiv className={"w-full h-full space-y-4 p-4 shadow-[0_0_5vh_rgba(0,0,0,0.7)] " + className}>
                    {children}
                </ContentDiv>
            </div>
        </>
    );
}