export default function NavWidget(nestedHtml, classOverride = 'min-h-10 h-fit w-full'){
    return (
        <>
            <div className={'flex items-center bg-white text-2xl rounded-full' + classOverride}>
                {nestedHtml}
            </div>
        </>
    );
}