import logo from '../assets/logos/ATUHub-Vertical-1024.png';
import { useNavigate } from 'react-router-dom';

export default function GenericPage({ children }) {
    const navigate = useNavigate();
    
    const handleNav = (path) => {
        navigate(path);
    };
    return (
        <div className="background-fixed w-screen h-full font-sans">
            <div className="relative flex flex-col items-center h-full">
                <div className="rounded-lg w-screen bg-opacity-90">
                    <img onClick={() => {handleNav('/home')}} src={logo} alt="ATUHub" className="mx-auto w-48 h-auto py-12 cursor-pointer" />
                    <div className="bg-zinc-300 min-h-screen max-h-full rounded-t-[2rem] p-4 space-y-4 shadow-[0_0_1vh_rgba(0,0,0,0.5)] flex-1 lg:max-w-screen-xl lg:ml-auto lg:mr-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
