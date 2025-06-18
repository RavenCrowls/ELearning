// Utility for managing authentication state in localStorage
export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        window.dispatchEvent(new Event('authChanged'));
    }
};

export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.dispatchEvent(new Event('authChanged'));
    }
};
