export default function NavWidget(nestedHtml, classOverride = 'bg-white h-fit w-full rounded-[1.5rem] shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]'){
    return (
        <>
            <div className={'flex items-center bg-white text-xl rounded-full' + classOverride}>
                {nestedHtml}
            </div>
        </>
    );
}