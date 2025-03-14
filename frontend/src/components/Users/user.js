import React from "react";
import { useNavigate } from "react-router-dom";
import Role from "./role";
import GreenButton from "../Buttons/GreenButton";

export default function User({ user }) {
    const navigate = useNavigate();
    let rolesArray = [];

    if (typeof user.roles === "string") {
        try {
            rolesArray = JSON.parse(user.roles);
            if (!Array.isArray(rolesArray)) {
                rolesArray = [];
            }
        } catch (error) {
            rolesArray = [user.roles];
        }
    } else if (Array.isArray(user.roles)) {
        rolesArray = user.roles;
    }

    const handleViewProfile = () => {
        navigate(`/user/${user.username}`);
    };

    return (
        <div className="flex bg-[#00000033] p-4 items-center justify-between rounded-2xl shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] space-y-2">
            <div className="flex flex-col gap-1">
                <p className="text-2xl font-semibold">
                    {user.firstName} {user.lastName}
                </p>
                <p className="text-sm">{user.username}</p>
                <div className="flex flex-wrap gap-2">
                    {rolesArray.map((role, index) => (
                        <Role key={index} className="text-xs" role={role} />
                    ))}
                </div>
            </div>
            <GreenButton onClick={handleViewProfile}>View Profile</GreenButton>
        </div>
    );
}