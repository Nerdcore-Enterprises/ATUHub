class UserPreferences {
    static darkMode = false;

    static setDarkMode(newDarkMode) {
        this.darkMode = newDarkMode;
    }

    static async loadPreferences() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/preferences', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const { darkMode } = await response.json();
                this.darkMode = typeof darkMode !== 'undefined' ? darkMode : false;
            } else {
                this.darkMode = false;
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
            this.darkMode = false;
        }
    }
}

export default UserPreferences;