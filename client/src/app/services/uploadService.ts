const UPLOAD_API_BASE = 'http://localhost:5010';

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${UPLOAD_API_BASE}/api/upload/image`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
}

export async function uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('video', file);
    const res = await fetch(`${UPLOAD_API_BASE}/api/upload/video`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload video');
    return res.json();
}