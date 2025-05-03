import logo from '../assets/logos/ATUHub-Vertical-1024.png';
import NavButton from './Buttons/NavButton';
import ContentDiv from './WidgetContainers/ContentDiv';

export default function GenericPage({ children }) {

    return (
        <div className="background-fixed w-screen h-full font-sans">
            <div className="relative flex flex-col items-center h-full">
                <div className="rounded-lg w-screen bg-opacity-90">
                    <NavButton to={'/home'}>
                        <img src={logo} alt="ATUHub" className="mx-auto w-48 h-auto py-12 cursor-pointer" />
                    </NavButton>
                    <ContentDiv
                        className="flex flex-col p-4 gap-4 min-h-screen max-h-full rounded-t-[2rem] shadow-[0_0_1vh_rgba(0,0,0,0.5)] lg:max-w-screen-xl lg:ml-auto lg:mr-auto"
                    >
                        {children}
                    </ContentDiv>
                </div>
            </div>
        </div>
    );
}
