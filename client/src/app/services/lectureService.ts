const LECTURE_API_BASE = 'http://localhost:5006';

export async function fetchLecturesByCourse(courseId: string) {
    const res = await fetch(`${LECTURE_API_BASE}/api/lectures/by-course/${courseId}`);
    if (!res.ok) throw new Error('Failed to fetch lectures');
    return res.json();
}