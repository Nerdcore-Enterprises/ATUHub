import { useNavigate } from "react-router-dom";

export default function NavButton({children, to, props, onClick = () => {}, className = ""}){
    const navigate = useNavigate();
    
    const handleNav = (path) => {
        if (props) {
            navigate(path, props);
        } else {
            navigate(path);
        }
    };

    return (
        <div 
            onClick={() => {handleNav(to); onClick()}}
            className={'cursor-pointer ' + className}
        >
            {children}
        </div>
    );
}