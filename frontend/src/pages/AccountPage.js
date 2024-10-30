import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';
import GenericPage from '../components/genericPage';

export default function AccountPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');

        navigate('/');
    };

    return (
        <GenericPage>
            <Header title="Jobs" />
            <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </GenericPage>
    );
}
