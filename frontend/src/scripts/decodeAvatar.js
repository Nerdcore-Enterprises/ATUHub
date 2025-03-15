function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function decodeAvatar(avatarData) {
    if (avatarData && avatarData.data) {
        const base64String = arrayBufferToBase64(avatarData.data);
        return `data:image/png;base64,${base64String}`;
    }
    return null;
}