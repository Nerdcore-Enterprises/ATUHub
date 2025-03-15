import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { decodeAvatar } from '../scripts/decodeAvatar';
import GenericPage from '../components/genericPage';
import LoadingIcon from '../components/GenericErrorPage/LoadingIcon';
import HeaderWithBack from '../components/HeaderWithBack';
import Alert from '../components/Alert';
import Role from '../components/Users/role';

export default function UserSlugPage() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${username}`);
                const data = await response.json();

                if (data.success) {
                    if (data.user.avatar && data.user.avatar.data) {
                        data.user.avatar = decodeAvatar(data.user.avatar);
                    }
                    setUser(data.user);
                } else {
                    setError(data.message || 'User not found');
                }
            } catch (err) {
                setError('Error fetching user data.');
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [username]);

    if (loading) return <LoadingIcon />;
    if (error) return (
        <GenericPage>
            <HeaderWithBack>Error</HeaderWithBack>
            <Alert severity={'danger'} text={error} />
        </GenericPage>
    );

    let rolesArray = [];
    if (user.roles) {
        if (Array.isArray(user.roles)) {
            rolesArray = user.roles;
        } else if (typeof user.roles === "string") {
            try {
                rolesArray = JSON.parse(user.roles);
                if (!Array.isArray(rolesArray)) {
                    rolesArray = [];
                }
            } catch (err) {
                rolesArray = [user.roles];
            }
        }
    }

    return (
        <GenericPage>
            <HeaderWithBack>{user.firstName} {user.lastName}</HeaderWithBack>
            <div className="flex items-center gap-4">
                {user.avatar && (
                    <img
                        src={user.avatar}
                        alt={`${user.username}'s avatar`}
                        className="w-32 h-32 border-2 border-[#00000033] rounded-full object-cover shadow-lg"
                    />
                )}
                <div className="flex flex-col gap-2">
                    {user.aboutme && <p className="mt-2 text-base">{user.aboutme}</p>}
                    {rolesArray.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {rolesArray.map((role, index) => (
                                <Role key={index} role={role} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </GenericPage>
    );
}