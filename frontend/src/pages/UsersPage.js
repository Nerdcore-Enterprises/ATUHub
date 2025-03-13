import React, { useState, useEffect } from 'react';
import GenericPage from '../components/genericPage';
import SearchBar from '../components/SearchBar';
import User from '../components/Users/user';
import LoadingIcon from '../components/GenericErrorPage/LoadingIcon';
import Alert from '../components/Alert';

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [error, setError] = useState(null);

    const [checkingPermission, setCheckingPermission] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const profile = await response.json();

                    let rolesArray = [];

                    if (typeof profile.roles === "string") {
                        try {
                            rolesArray = JSON.parse(profile.roles);
                            if (!Array.isArray(rolesArray)) {
                                rolesArray = [];
                            }
                        } catch (error) {
                            rolesArray = [profile.roles];
                        }
                    } else if (Array.isArray(profile.roles)) {
                        rolesArray = profile.roles;
                    }

                    if (rolesArray.includes('Admin')) {
                        setIsAdmin(true);
                    }
                } else {
                    setError('Failed to fetch user profile');
                }
            } catch (err) {
                setError('Error fetching user profile.');
            } finally {
                setCheckingPermission(false);
            }
        }
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (!isAdmin) {
            setLoadingUsers(false);
            return;
        }

        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                if (data.success) {
                    setUsers(data.users);
                } else {
                    setError(data.message || 'Failed to load users');
                }
            } catch (err) {
                setError('Error fetching users.');
            } finally {
                setLoadingUsers(false);
            }
        }
        fetchUsers();
    }, [isAdmin]);

    if (checkingPermission || loadingUsers) return <LoadingIcon />;
    if (error) return <GenericPage><p>{error}</p></GenericPage>;
    if (!isAdmin) {
        return (
            <GenericPage>
                <Alert severity={'danger'} text={'You do not have permission to view this page.'} />
            </GenericPage>
        );
    }

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        const firstName = user.firstName?.toLowerCase() || "";
        const lastName = user.lastName?.toLowerCase() || "";
        const username = user.username?.toLowerCase() || "";
        return firstName.includes(query) || lastName.includes(query) || username.includes(query);
    });

    return (
        <GenericPage>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <div className="grid grid-cols-1 gap-4">
                {filteredUsers.map(user => (
                    <User key={user.id} user={user} />
                ))}
            </div>
        </GenericPage>
    );
}