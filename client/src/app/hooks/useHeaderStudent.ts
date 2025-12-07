'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClerk, useUser, useAuth } from '@clerk/nextjs';
import { getUserById } from '@/app/services/userService';

export function useHeaderStudent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/avatar.jpg');
  const router = useRouter();
  const clerk = useClerk();
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      if (user?.id) {
        try {
          const token = await getToken();
          const data = await getUserById(user.id, token || undefined);
          if (data?.AVATAR) {
            setAvatarUrl(data.AVATAR);
          } else {
            setAvatarUrl('/avatar.jpg');
          }
        } catch {
          setAvatarUrl('/avatar.jpg');
        }
      }
    }
    fetchUser();
  }, [user, getToken]);

  const handleLogout = () => {
    clerk.signOut();
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q !== '') {
      router.push(`/coursefilter?search=${encodeURIComponent(q)}`);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    avatarUrl,
    handleLogout,
    handleSearch,
    router,
  };
}