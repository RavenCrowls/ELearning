/**
 * useUserSync Hook
 * Automatically syncs Clerk user to MongoDB when user logs in
 */

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { syncUserToMongoDB, extractClerkUserData } from "../services/userSync";

export function useUserSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      // Only sync if:
      // 1. Clerk is loaded
      // 2. User is signed in
      // 3. User object exists
      // 4. Haven't synced yet in this session
      if (isLoaded && isSignedIn && user && !hasSynced.current) {
        try {
          const userData = extractClerkUserData(user);
          await syncUserToMongoDB(userData);
          hasSynced.current = true;
          console.log("User synced to MongoDB");
        } catch (error) {
          console.error("Failed to sync user:", error);
          // Don't set hasSynced to true so it can retry on next mount
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return { isLoaded, isSignedIn, user };
}
