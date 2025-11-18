const ENROLLMENT_API_BASE = 'http://localhost:5002';

export async function fetchEnrollmentsByUser(userId: string) {
    const res = await fetch(`${ENROLLMENT_API_BASE}/api/enrollments/user/${userId}`);
    if (!res.ok) return [];
    return res.json();
}