

export default function HorizontalWidgetList({children, className = ""}){
    return (
        <div className={"flex space-x-4 rounded-b-[1rem] overflow-visible " + className}>
            {children}
        </div>
    );
}