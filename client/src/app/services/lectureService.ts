const LECTURE_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const LECTURE_API = `${LECTURE_API_BASE}/api/lectures`;

export async function fetchLecturesByCourse(courseId: string) {
  const res = await fetch(`${LECTURE_API}/by-course/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch lectures");
  return res.json();
}

export async function getLectureById(lectureId: string) {
  const res = await fetch(`${LECTURE_API}/${lectureId}`);
  return res.ok;
}

export async function putLecture(lectureId: string, payload: any) {
  const res = await fetch(`${LECTURE_API}/${lectureId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update lecture");
  return res.json?.();
}

export async function postLecture(payload: any) {
  const res = await fetch(`${LECTURE_API}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create lecture");
  return res.json?.();
}

export async function deleteLecture(lectureId: string) {
  const res = await fetch(`${LECTURE_API}/${lectureId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete lecture");
  return true;
}
