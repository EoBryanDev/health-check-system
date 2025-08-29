"use client"

export async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Logout failed on the server.');
            return false;
        }

        return true;
    } catch (error) {
        console.error('An error occurred during logout:', error);
        return false;
    }
}


