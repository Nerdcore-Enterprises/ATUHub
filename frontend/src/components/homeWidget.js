export default function Widget(nestedHtml, classOverride = 'min-h-10 h-fit w-full'){
    return (
        <>
            <div className={'bg-white rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,1)]' + classOverride}>
                {nestedHtml}
            </div>
        </>
    );
}