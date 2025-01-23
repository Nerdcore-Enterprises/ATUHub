export default function ResponsiveFullWidget({ children, onClose, visible }) {
    return (
        <>
            <div className="fixed top-[50vh] left-[50vw] w-[80vw] h-[80vh] translate-y-[-50%] translate-x-[-50%]  lg:static ">
                <div className={" mx-auto " + (visible ? "block" : "hidden") + " fixed flex flex-col bg-white rounded-[2rem] px-2  shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2 w-[100%] h-[100%] lg:w-full lg:h-full lg:static lg:block m-20 lg:m-0"}>
                    {children}
                </div>
            </div>
        </>
    );
}
