import React from "react";
import { useNavigate } from "react-router-dom";
import { decodeAvatar } from "../../scripts/decodeAvatar";
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

    const avatarSrc = user.avatar && user.avatar.data
        ? decodeAvatar(user.avatar)
        : user.username;

    return (
        <div className="flex bg-[#00000033] items-center justify-between min-h-32 p-4 rounded-2xl shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] gap-4">
            <div className="flex gap-4 items-center">
                <p className="font-mono">{user.id}</p>
                {user.avatar && (
                    <img src={avatarSrc} alt={user.username} className="border-2 rounded-xl w-20 h-20" />
                )}
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm">{user.username}</p>
                    <div className="flex flex-wrap gap-2">
                        {rolesArray.map((role, index) => (
                            <Role key={index} className="text-xs" role={role} />
                        ))}
                    </div>
                    <p className="text-xs">{user.aboutme}</p>
                </div>
            </div>
            <GreenButton onClick={handleViewProfile}>View Profile</GreenButton>
        </div>
    );
}