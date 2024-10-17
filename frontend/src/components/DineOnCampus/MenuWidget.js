export default function DineOnCampusMenuWidget({ menuPeriods = [], title }) {
    return (
        <div className="flex flex-col items-center space-y-4 bg-white rounded-[2rem] p-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <h2 className="font-bold text-2xl">{title}</h2>

            {menuPeriods.length === 0 ? (
                <span className="text-zinc-500 font-bold">Loading...</span>
            ) : (
                menuPeriods.map((period, periodIndex) => (
                    <div key={periodIndex} className="flex flex-col w-full space-y-2">
                        <div className="flex items-center justify-between bg-zinc-800 text-white rounded-full py-2 px-4">
                            <h3 className="text-xl font-bold">{period.period}</h3>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {period.categories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-zinc-100 rounded-lg p-3">
                                    <h4 className="text-lg font-bold text-zinc-700">{category.category}</h4>

                                    {category.items.length === 0 ? (
                                        <p className="text-zinc-500 font-bold">No items found</p>
                                    ) : (
                                        <ul className="list-disc list-inside">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-zinc-700">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}