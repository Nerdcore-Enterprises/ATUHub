export default function Role({ role }) {
    const roleColors = {
        Administrator: "bg-gradient-to-br from-red-600 to-red-900 font-semibold text-white",
        Designer: "bg-gradient-to-br from-purple-600 to-purple-950 font-semibold text-white",
        Developer: "bg-gradient-to-br from-blue-700 to-blue-950 font-mono font-normal text-white",
        Driver: "bg-gradient-to-br from-green-600 to-green-950 font-semibold text-white",
        Guest: "bg-zinc-800 font-semibold text-white",
        default: "bg-zinc-800 font-semibold text-white"
    };

    const bgColor = roleColors[role] || roleColors.default;

    return (
        <div className={`${bgColor} px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]`}>
            <p className="text-sm">{role}</p>
        </div>
    );
}