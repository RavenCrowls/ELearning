const ENROLLMENT_API_BASE = 'http://localhost:5002';

export async function fetchEnrollmentsByUser(userId: string) {
    const res = await fetch(`${ENROLLMENT_API_BASE}/api/enrollments/user/${userId}`);
    if (!res.ok) return [];
    return res.json();
}

export async function updateEnrollmentProgress(enrollmentId: string, payload: { VIDEO_ID: string; COURSE_ID: string }) {
    const res = await fetch(`${ENROLLMENT_API_BASE}/api/enrollments/progress/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update progress');
    return res.json?.();
}