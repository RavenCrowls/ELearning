/**
 * Clerk Authentication Utilities
 * Helper functions for getting Clerk session tokens
 */

import { useAuth } from "@clerk/nextjs";

/**
 * Hook to get a properly formatted Clerk session token
 * Use this in components to get the auth token for API calls
 */
export function useClerkToken() {
  const { getToken, isSignedIn } = useAuth();

  const getAuthToken = async (): Promise<string | null> => {
    if (!isSignedIn) {
      return null;
    }

    try {
      // Get the session token from Clerk
      // This returns the JWT token for the current session
      const token = await getToken();
      return token;
    } catch (error) {
      console.error("Error getting Clerk token:", error);
      return null;
    }
  };

  return { getAuthToken, isSignedIn };
}

/**
 * Get Clerk token in async functions (outside of React components)
 */
export async function getClerkSessionToken(
  getToken: () => Promise<string | null>
): Promise<string | null> {
  try {
    const token = await getToken();
    return token;
  } catch (error) {
    console.error("Error getting Clerk session token:", error);
    return null;
  }
}
