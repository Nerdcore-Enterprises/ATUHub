import React, { useState, useEffect } from 'react';
import GenericPage from '../components/genericPage';
import UserPreferences from '../scripts/UserPreferences';

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
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <div className="flex items-center">
                    <label htmlFor="darkModeToggle" className="mr-2">
                        Dark Mode:
                    </label>
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        checked={darkMode}
                        onChange={handleToggleDarkMode}
                        className="toggle-checkbox"
                    />
                </div>
            </div>
        </GenericPage>
    );
}