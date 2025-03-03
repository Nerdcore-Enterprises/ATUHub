

export default function VerticalWidgetList({children, className = ""}){
    return (
        <div className={"flex flex-col overflow-visible justify-center w-full " + className}>
            {children}
        </div>
    );
}