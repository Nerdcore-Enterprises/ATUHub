export default function DineOnCampusWidget({ locations, earliestStart, latestEnd, title }) {
    return (
        <div className="flex flex-col items-center space-y-2 bg-white rounded-[2rem] p-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <h2 className="font-bold text-2xl">{title}</h2>
            <div className="font-normal text-lg p-2">
                {earliestStart && latestEnd ? (
                    <>
                        {earliestStart} - {latestEnd}
                    </>
                ) : (
                    <span className="text-zinc-500 font-bold">Loading...</span>
                )}
            </div>

            {locations.map((location, index) => {
                return (
                    <div key={index} className="flex flex-row items-center bg-zinc-800 h-10 w-full rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        <p className="font-normal text-white text-xl ml-4 mr-auto">
                            {location.name}
                        </p>
                        <div className={`flex flex-row items-center h-10 rounded-r-full bg-gradient-to-r from-5% from-transparent to-10% ${location.isOpen ? 'to-green-500' : (location.statusMessage.includes('Closing') ? 'to-yellow-300' : 'to-red-500')}`}>
                            <p className="font-normal text-black text-md mx-8 text-right">
                                {location.statusMessage}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}