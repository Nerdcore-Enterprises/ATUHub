import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetFixedHeight from "../BaseWidgets/WidgetFixedHeight";
import NavButton from "../Buttons/NavButton";

export default function SidebarNavButton({to, name, icon, setIsSidebarOpen}){
    return (
        <NavButton to={to} onClick={() => setIsSidebarOpen(false)}>
            <WidgetFixedHeight height={50} className="w-full text-left items-center text-xl">
                <div className="w-full h-full flex flex-row items-center">
                    <FontAwesomeIcon icon={icon} className="py-4 w-16" />
                    <p>{name}</p>
                </div>
            </WidgetFixedHeight>
        </NavButton>
    );
}
