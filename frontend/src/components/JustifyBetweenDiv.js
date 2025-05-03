export default function JustifyBetweenDiv({children}){
    return (
        <>
            <div className="flex flex-row justify-between text-xl">
                {children}
            </div>
        </>
    );
}