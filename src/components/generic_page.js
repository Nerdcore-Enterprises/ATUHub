import logo from '../assets/logos/ATUHub-Vertical-1024.png';

//stylesheet
import './generic_page.css'

export default function GenericPage(content){
    return (
        <div className="background-fixed relative w-screen h-screen font-sans overflow-hidden">
            <div className="relative flex flex-col items-center h-full">
                <div className="rounded-lg w-screen bg-opacity-90">
                    <img src={logo} alt="ATUHub" className="mx-auto w-48 h-auto py-12" />

                    <div className="bg-zinc-300 min-h-screen max-h-full rounded-[2rem] p-4 space-y-4 shadow-[0_0_1vh_rgba(0,0,0,0.5)] flex-1 overflow-y-auto">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}