export default function InfoDisplay({children}){
    return (
        <div className='grow overflow-auto pb-10 mx-10 mt-2'>
            {children}
        </div>
    );
}