import AppColors from "../constants/AppColors";

export default function Widget({ children, className = "" }) {
    const darkMode = false;

    return (
        <>
            <div
                style={{background: AppColors.WidgetBgLight}} 
                className={"lex flex-col rounded-[2rem] px-2 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2 " + className}>
                {children}
            </div>
        </>
    );
}
