export default function DineOnCampusWidget({ locations, earliestStart, latestEnd }) {
    const formatClosingTime = (closingTime) => {
        if (closingTime === 'Closed today') return closingTime;

        const timeParts = closingTime.split(' ');

        const hoursLeft = parseInt(timeParts[0]);
        const minutesLeft = parseInt(timeParts[3]);

        if (hoursLeft > 0) {
            return 'Open';
        } else if (hoursLeft === 0 && minutesLeft > 0) {
            return `Closes in ${minutesLeft} minutes`;
        } else {
            return `Closed`;
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2 bg-white rounded-[2rem] p-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
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
                const isOpen = location.closingTime !== 'Closed today';

                let displayText = '';
                if (location.closingTime === 'Closed today') {
                    displayText = `Closed`;
                } else {
                    displayText = formatClosingTime(location.closingTime);
                }

                return (
                    <div
                        key={index}
                        className="flex flex-row items-center bg-zinc-800 h-10 w-full rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    >
                        <p className="font-normal text-white text-xl ml-4 mr-auto">
                            {location.name}
                        </p>
                        <div
                            className={`flex flex-row items-center h-10 rounded-r-full bg-gradient-to-r from-5% from-transparent to-10% ${displayText.includes('Closes') ? 'to-yellow-300' : ''} ${isOpen ? 'to-green-500' : 'to-red-500'}`}
                        >
                            <p className="font-normal text-black text-md mx-8 text-right">
                                {displayText}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}