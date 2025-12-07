const VIDEO_API_BASE = 'http://localhost:5007';

export async function fetchVideosByLecture(lectureId: string) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/by-lecture/${lectureId}`);
    if (!res.ok) throw new Error('Failed to fetch videos');
    return res.json();
}

export async function getVideoById(videoId: string) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/${videoId}`);
    return res.ok;
}

export async function putVideo(videoId: string, payload: any) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/${videoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update video');
    return res.json?.();
}

export async function postVideo(payload: any) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create video');
    return res.json?.();
}

export async function deleteVideo(videoId: string) {
    const res = await fetch(`${VIDEO_API_BASE}/api/videos/${videoId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete video');
    return true;
}