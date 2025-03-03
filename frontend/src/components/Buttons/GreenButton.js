export default function GreenButton({children, onClick = () => {}, className = ""}){
    return (
        <button onClick={onClick} className={"bg-[var(--ATUGreen)] rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] " + className}>
            {children}
        </button>
    );
}