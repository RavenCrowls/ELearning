const USER_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const USER_API = `${USER_API_BASE}/api/users`;

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

export async function getUserById(
  userId: string,
  token?: string
): Promise<UserData> {
  console.log("getUserById called with:", {
    userId,
    hasToken: !!token,
    tokenPreview: token?.substring(0, 20),
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${USER_API}/${userId}`, { headers });

  console.log("getUserById response:", { status: res.status, ok: res.ok });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("getUserById error:", errorText);
    throw new Error(`Failed to fetch user data: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function listUsers() {
  const res = await fetch(`${USER_API}/`);
  if (!res.ok) return [];
  return res.json();
}
