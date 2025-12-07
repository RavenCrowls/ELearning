const LECTURE_API_BASE = 'http://localhost:5006';

export async function fetchLecturesByCourse(courseId: string) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/by-course/${courseId}`);
    if (!res.ok) throw new Error('Failed to fetch lectures');
    return res.json();
}

export async function getLectureById(lectureId: string) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/${lectureId}`);
    return res.ok;
}

export async function putLecture(lectureId: string, payload: any) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/${lectureId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update lecture');
    return res.json?.();
}

export async function postLecture(payload: any) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create lecture');
    return res.json?.();
}

export async function deleteLecture(lectureId: string) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/${lectureId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete lecture');
    return true;
}