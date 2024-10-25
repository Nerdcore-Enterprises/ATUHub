export default function Widget({ title }) {
    return (
        <div className="flex items-center space-x-4">
            <h1 className="bg-white font-normal text-center text-xl rounded-full p-4 w-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                {title}
            </h1>
        </div>
    );
}
