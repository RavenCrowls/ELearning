const UPLOAD_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const UPLOAD_API = `${UPLOAD_API_BASE}/api/upload`;

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${UPLOAD_API}/image`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}

export async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("video", file);
  const res = await fetch(`${UPLOAD_API}/video`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload video");
  return res.json();
}
