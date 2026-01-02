const COURSE_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const COURSE_API = `${COURSE_API_BASE}/api/courses`;

export async function fetchCourse(courseId: number) {
  try {
    const res = await fetch(`${COURSE_API}/${courseId}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchPopularCourses() {
  const res = await fetch(`${COURSE_API}/popular`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchNewestCourses() {
  const res = await fetch(`${COURSE_API}/newest`);
  if (!res.ok) return [];
  return res.json();
}

export async function updateCourse(courseId: string, payload: any) {
  const res = await fetch(`${COURSE_API}/${courseId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course");
  return res.json();
}

export async function createCourse(payload: any) {
  const res = await fetch(`${COURSE_API}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

export async function fetchCoursesByInstructor(instructorId: string) {
  const res = await fetch(`${COURSE_API}/instructor/${instructorId}`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchAllCourses() {
  const res = await fetch(`${COURSE_API}/`);
  if (!res.ok) return [];
  return res.json();
}

export async function searchCourses(name: string) {
  const res = await fetch(
    `${COURSE_API}/search?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) return [];
  return res.json();
}

export async function filterCourses(params: URLSearchParams) {
  const url = `${COURSE_API}/filter?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
}
