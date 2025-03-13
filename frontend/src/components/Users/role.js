export default function Role({ role }) {
    const roleColors = {
        Admin: "bg-red-400",
        Designer: "bg-purple-600",
        default: "bg-[#FFFFFF33]"
    };

    const bgColor = roleColors[role] || roleColors.default;

    return (
        <div className={`${bgColor} px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]`}>
            <p className="text-sm font-semibold">{role}</p>
        </div>
    );
}