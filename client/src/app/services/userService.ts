const USER_API_BASE = 'http://localhost:5000';

export interface UserData {
    _id: string;
    USER_ID: string;
    ROLE_ID: string;
    NAME: string;
    ADDRESS: string;
    PHONE: string;
    BIRTH_DATE: string | null;
    EMAIL: string;
    USERNAME: string;
    PASSWORD: string;
    AVATAR: string;
    BIO: string;
    JOIN_DATE: string;
    STATUS: boolean;
}

export async function getUserById(userId: string, token?: string): Promise<UserData> {
    const res = await fetch(`${USER_API_BASE}/api/users/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
        throw new Error('Failed to fetch user data');
    }
    return res.json();
}