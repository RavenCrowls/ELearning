'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';

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

export default function AuthRedirectPage() {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function handleRedirect() {
            if (!isSignedIn || !user) {
                setLoading(false);
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

                    // Redirect based on role
                    if (userData.ROLE_ID === "2") {
                        // Student - redirect to homepage
                        router.push("/");
                    } else if (userData.ROLE_ID === "3") {
                        // Instructor - redirect to instructor profile
                        router.push("/profile-instructor");
                    } else {
                        // Default fallback
                        router.push("/");
                    }
                } else {
                    console.error('Failed to fetch user data for redirect');
                    // Default fallback
                    router.push("/");
                }
            } catch (error) {
                console.error('Error fetching user data for redirect:', error);
                // Default fallback
                router.push("/");
            } finally {
                setLoading(false);
            }
        }

        handleRedirect();
    }, [user, isSignedIn, getToken, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting...</p>
                </div>
            </div>
        );
    }

    return null;
} 