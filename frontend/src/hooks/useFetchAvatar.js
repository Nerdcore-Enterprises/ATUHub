import { useEffect } from 'react';

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export default function useFetchAvatar(token) {
    useEffect(() => {
        if (!token) return;

        async function fetchProfile() {
            try {
                const response = await fetch('/api/user/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (data && data.avatar && data.avatar.data) {
                    const base64String = arrayBufferToBase64(data.avatar.data);
                    const imageSrc = `data:image/jpeg;base64,${base64String}`;
                    localStorage.setItem('avatar', imageSrc);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        fetchProfile();
    }, [token]);
}