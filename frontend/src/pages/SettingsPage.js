import React, { useState, useEffect } from 'react';
import GenericPage from '../components/genericPage';
import UserPreferences from '../scripts/UserPreferences';
import HeaderWithBack from '../components/HeaderWithBack';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(UserPreferences.darkMode);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/user/preferences', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setDarkMode(result.darkMode);
                    UserPreferences.setDarkMode(result.darkMode);
                }
            } catch (error) {
                console.error('Error fetching user preferences', error);
            }
        };
        fetchPreferences();
    }, []);

    const handleToggleDarkMode = async (e) => {
        const newDarkMode = e.target.checked;
        setDarkMode(newDarkMode);
        UserPreferences.setDarkMode(newDarkMode);

        try {
            const darkMode = localStorage.getItem('darkMode');

            if (darkMode !== null) {
                localStorage.setItem('darkMode', newDarkMode);
            }

            const token = localStorage.getItem('token');

            await fetch('/api/user/preferences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ darkMode: newDarkMode })
            });
        } catch (error) {
            console.error('Error updating dark mode preference', error);
        }
    };

    return (
        <GenericPage>
            <HeaderWithBack>Settings</HeaderWithBack>
            <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">Dark Mode:</span>
                <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        className="sr-only peer"
                        checked={darkMode}
                        onChange={handleToggleDarkMode}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full
                                dark:bg-gray-700 peer peer-checked:bg-blue-600 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                                after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                                dark:border-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white">
                    </div>
                </label>
            </div>
        </GenericPage>
    );
}