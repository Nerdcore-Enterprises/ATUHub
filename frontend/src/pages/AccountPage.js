import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';

import HeaderWithBack from '../components/HeaderWithBack';
import GenericPage from '../components/genericPage';
import Alert from '../components/Alert';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function AccountPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        avatar: '',
        firstName: '',
        lastName: '',
        aboutme: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/user/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    let avatarStr = '';
                    if (result.avatar && result.avatar.data) {
                        const binaryStr = String.fromCharCode(...result.avatar.data);
                        avatarStr = `data:image/png;base64,${btoa(binaryStr)}`;
                    }
                    setUserData({
                        username: result.username ? result.username.trim() : '',
                        avatar: avatarStr,
                        firstName: result.firstName ? result.firstName.trim() : '',
                        lastName: result.lastName ? result.lastName.trim() : '',
                        aboutme: result.aboutme || '',
                    });
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData(prevData => ({
                ...prevData,
                avatar: file
            }));
        }
    };

    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 256;
                    canvas.height = 256;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, 256, 256);
                    const dataUrl = canvas.toDataURL("image/png");
                    const base64String = dataUrl.split(",")[1];
                    resolve(base64String);
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setAlert(null);
        try {
            let avatarBase64 = '';
            if (userData.avatar instanceof File) {
                avatarBase64 = await resizeImage(userData.avatar);
            }

            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: userData.firstName.trim(),
                    lastName: userData.lastName.trim(),
                    aboutme: userData.aboutme,
                    avatar: avatarBase64
                })
            });
            if (response.ok) {
                const result = await response.json();
                setAlert({ severity: 'success', text: result.message || 'Profile updated successfully' });
            } else {
                setAlert({ severity: 'danger', text: 'Failed to save profile changes' });
                console.error('Failed to save profile changes');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            setAlert({ severity: 'danger', text: 'Error saving profile' });
        } finally {
            setIsSaving(false);
        }
    };

    const avatarPreview =
        userData.avatar instanceof File
            ? URL.createObjectURL(userData.avatar)
            : userData.avatar;

    return (
        <GenericPage>
            <HeaderWithBack>Profile</HeaderWithBack>
            {alert && <Alert severity={alert.severity} text={alert.text} />}
            <form className="flex flex-col gap-4">
                <div className="flex justify-center">
                    <label htmlFor="avatar" className="cursor-pointer group">
                        <div className="relative">
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    className="max-w-36 max-h-36 mt-2 border-2 border-zinc-700 rounded-full object-cover shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                                    alt="avatar"
                                />
                            ) : (
                                <div className="max-w-36 max-h-36 mt-2 rounded-full bg-gray-300 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUser} className="text-white" size="2x" />
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                                <FontAwesomeIcon icon={faCamera} className="text-white opacity-0 group-hover:opacity-100 transition duration-300" size="2x" />
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>
                <div className="flex flex-col gap-2 w-64">
                    <label htmlFor="username" className="font-semibold">Username:</label>
                    <p className="bg-[#00000033] px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.3)]">{userData.username}</p>
                </div>
                <div className="flex flex-col gap-2 w-64">
                    <label htmlFor="firstName" className="font-semibold">First Name:</label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    />
                </div>
                <div className="flex flex-col gap-2 w-64">
                    <label htmlFor="lastName" className="font-semibold">Last Name:</label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="px-2 py-1 rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="aboutme" className="font-semibold">About Me:</label>
                    <Textarea
                        id="aboutme"
                        name="aboutme"
                        value={userData.aboutme}
                        onChange={handleInputChange}
                        className="px-2 py-1 rounded-2xl w-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                        rows={4}
                    />
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="transition-colors duration-150 px-4 py-2 bg-[#337700AA] hover:bg-[#337700] text-white rounded-full w-32 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="transition-colors duration-150 px-4 py-2 bg-[#AA0000AA] hover:bg-[#AA0000] text-white rounded-full w-32 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </GenericPage>
    );
}