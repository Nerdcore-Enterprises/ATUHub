export default function Widget({ children }) {
    return (
        <>
            <div className="flex flex-col bg-white rounded-[2rem] px-2 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2">
                {children}
            </div>
        </>
    );
}
