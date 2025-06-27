import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface UserData {
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

interface UseRoleProtectionOptions {
    requiredRole: string;
    redirectTo?: string;
    onUnauthorized?: () => void;
}

export function useRoleProtection({
    requiredRole,
    redirectTo = '/',
    onUnauthorized
}: UseRoleProtectionOptions) {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        async function checkAuthorization() {
            if (!isSignedIn || !user) {
                // Not signed in, redirect to sign-in
                router.push('/sign-in');
                return;
            }

            try {
                const token = await getToken();
                const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData: UserData = await response.json();
                    setUserData(userData);

                    // Check if user has the required role
                    if (userData.ROLE_ID === requiredRole) {
                        setIsAuthorized(true);
                    } else {
                        // User doesn't have the required role
                        if (onUnauthorized) {
                            onUnauthorized();
                        } else {
                            router.push(redirectTo);
                        }
                    }
                } else {
                    // Failed to fetch user data, redirect to sign-in
                    router.push('/sign-in');
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
                // Error occurred, redirect to sign-in
                router.push('/sign-in');
            } finally {
                setLoading(false);
            }
        }

        checkAuthorization();
    }, [user, isSignedIn, getToken, router, requiredRole, redirectTo, onUnauthorized]);

    return {
        loading,
        isAuthorized,
        userData,
        user,
        isSignedIn
    };
}

// Convenience hooks for specific roles
export function useInstructorProtection(redirectTo = '/profile-instructor') {
    return useRoleProtection({ requiredRole: '3', redirectTo });
}

export function useStudentProtection(redirectTo = '/') {
    return useRoleProtection({ requiredRole: '2', redirectTo });
}

// Legacy hook names for backward compatibility
export function useAdminProtection(redirectTo = '/') {
    return useRoleProtection({ requiredRole: '2', redirectTo }); // Admin role not currently used
}

export function useLearnerProtection(redirectTo = '/') {
    return useRoleProtection({ requiredRole: '2', redirectTo }); // Same as student
} 