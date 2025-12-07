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

export async function updateCourse(courseId: string, payload: any) {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update course');
    return res.json();
}

export async function createCourse(payload: any) {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create course');
    return res.json();
}

export async function fetchCoursesByInstructor(instructorId: string) {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/instructor/${instructorId}`);
    if (!res.ok) return [];
    return res.json();
}

export async function fetchAllCourses() {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/`);
    if (!res.ok) return [];
    return res.json();
}

export async function searchCourses(name: string) {
    const res = await fetch(`${COURSE_API_BASE}/api/courses/search?name=${encodeURIComponent(name)}`);
    if (!res.ok) return [];
    return res.json();
}

export async function filterCourses(params: URLSearchParams) {
    const url = `${COURSE_API_BASE}/api/courses/filter?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
}