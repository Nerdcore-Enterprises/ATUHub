import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericPage from '../components/genericPage';
import LoadingIcon from '../components/GenericErrorPage/LoadingIcon';
import HeaderWithBack from '../components/HeaderWithBack';
import Alert from '../components/Alert';

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

    return (
        <GenericPage>
            <HeaderWithBack>{user.firstName} {user.lastName}</HeaderWithBack>
            <p>{user.username}</p>
        </GenericPage>
    );
}