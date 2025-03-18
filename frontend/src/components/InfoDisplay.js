export default function InfoDisplay({children}){
    return (
        <div className={'grow overflow-auto pb-10 mx-10 mt-2 ' + (window.innerWidth >= 1024 ? 'max-h-[75vh]' : 'max-h-[60vh]')}>
            {children}
        </div>
    );
}