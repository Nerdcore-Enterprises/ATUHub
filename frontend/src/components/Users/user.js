import React from "react";
import Role from "./role";

export default function User({ user }) {
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

    return (
        <div className="bg-[#00000033] p-4 rounded-2xl shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] space-y-2">
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
    );
}