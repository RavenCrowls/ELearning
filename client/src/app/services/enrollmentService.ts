const ENROLLMENT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const ENROLLMENT_API = `${ENROLLMENT_API_BASE}/api/enrollments`;

export async function fetchEnrollmentsByUser(userId: string, token?: string) {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${ENROLLMENT_API}/user/${userId}`, { headers });

    // Return empty array for auth errors or not found - user might not have enrollments
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch enrollments: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
}

export async function updateEnrollmentProgress(
  enrollmentId: string,
  payload: { VIDEO_ID: string; COURSE_ID: string }
) {
  const res = await fetch(`${ENROLLMENT_API}/progress/${enrollmentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update progress");
  return res.json?.();
}
