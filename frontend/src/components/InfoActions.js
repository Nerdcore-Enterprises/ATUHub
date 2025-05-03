import StickyWidget from "./BaseWidgets/StickyWidget";

export default function InfoActions({children, extraInfo}){
    return (
        <StickyWidget className='bottom-0 shadow-none bg-red-100 pb-5'>
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