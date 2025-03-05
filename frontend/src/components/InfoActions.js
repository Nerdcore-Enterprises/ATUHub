import StickyWidget from "./BaseWidgets/StickyWidget";

export default function InfoActions({children, extraInfo}){
    return (
        <StickyWidget className='bottom-5 shadow-none'>
            <div className="w-full h-full px-10">
                <hr className='mb-4'></hr>
                {extraInfo}
                <div className='h-fit py-2 flex flex-row gap-4'>
                    {children}
                </div>  
            </div>
        </StickyWidget>
    );
}