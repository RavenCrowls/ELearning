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

export async function fetchPopularCourses() {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/popular`);
    if (!res.ok) return [];
    return res.json();
}

export async function fetchNewestCourses() {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/newest`);
    if (!res.ok) return [];
    return res.json();
}