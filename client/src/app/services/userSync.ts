/**
 * User Sync Service
 * Syncs Clerk user data to MongoDB
 */

export interface ClerkUserData {
  userId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

const USER_SERVICE_URL =
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:5000";

/**
 * Syncs a user from Clerk to MongoDB
 * Call this after successful sign-up or on first login
 */
export async function syncUserToMongoDB(userData: ClerkUserData) {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/api/users/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sync user");
    }

    const result = await response.json();
    console.log("User synced successfully:", result);
    return result;
  } catch (error) {
    console.error("Error syncing user to MongoDB:", error);
    throw error;
  }
}

/**
 * Gets user data from Clerk user object
 */
export function extractClerkUserData(clerkUser: any): ClerkUserData {
  return {
    userId: clerkUser.id,
    email:
      clerkUser.emailAddresses?.[0]?.emailAddress ||
      clerkUser.primaryEmailAddress?.emailAddress ||
      "",
    username: clerkUser.username || "",
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    imageUrl: clerkUser.imageUrl || clerkUser.profileImageUrl || "",
  };
}
