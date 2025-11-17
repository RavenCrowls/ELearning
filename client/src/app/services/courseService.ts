const COURSE_API_BASE = 'http://localhost:5003';

export async function fetchCourse(courseId: number) {
    try {
        const res = await fetch(`${COURSE_API_BASE}/api/courses/${courseId}`);
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}