export default function Role({ role }) {
    const roleColors = {
        Administrator: "bg-gradient-to-r from-red-500 to-red-800",
        Designer: "bg-gradient-to-r from-purple-500 to-purple-800",
        Developer: "bg-gradient-to-r from-blue-500 to-blue-800 font-mono",
        default: "bg-[#FFFFFF33]"
    };

    const bgColor = roleColors[role] || roleColors.default;

    return (
        <div className={`${bgColor} px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]`}>
            <p className="text-sm font-semibold">{role}</p>
        </div>
    );
}