export default function Widget(nestedHtml){
    return (
        <>
            <div className="bg-white min-h-10 h-fit w-full rounded-[calc(2rem-0.5rem)] p-2 shadow-[0_0.25vh_0.5vh_rgba(0,0,0,0.2)]">
                {nestedHtml}
            </div>
        </>
    );
}