'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';
import { getUserById, UserData } from '@/app/services/userService';

export default function RedirectHandler() {
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
                const userData: UserData = await getUserById(user.id, token || undefined);

                if (userData.ROLE_ID === '2') {
                    router.push('/');
                } else if (userData.ROLE_ID === '3') {
                    router.push('/profile-instructor');
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching user data for redirect:', error);
                router.push('/');
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