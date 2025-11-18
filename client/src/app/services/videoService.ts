const VIDEO_API_BASE = 'http://localhost:5007';

export async function fetchVideosByLecture(lectureId: string) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/by-lecture/${lectureId}`);
    if (!res.ok) throw new Error('Failed to fetch videos');
    return res.json();
}