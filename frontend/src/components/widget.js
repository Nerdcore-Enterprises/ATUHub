export default function Widget(nestedHtml, classOverride = 'min-h-10 h-fit w-full p-2'){
    return (
        <>
            <div className={
                'bg-white rounded-[calc(2rem-0.5rem)] shadow-[0_0.25vh_0.5vh_rgba(0,0,0,0.2)]'
                + ' ' + classOverride
            }>
                {nestedHtml}
            </div>
        </>
    );
}