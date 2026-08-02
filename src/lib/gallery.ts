import { supabase } from "@/integrations/supabase/client";

export interface DrivePhoto {
  id: string;
  name: string;
  uploadedBy: string;
  createdTime: string;
}

const FUNCTIONS_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;

export function driveImageUrl(id: string) {
  return `${FUNCTIONS_BASE}/gallery-image?id=${encodeURIComponent(id)}`;
}

export async function fetchGalleryPhotos(): Promise<DrivePhoto[]> {
  const { data, error } = await supabase.functions.invoke("gallery-list");
  if (error) {
    console.error("fetchGalleryPhotos error", error);
    throw error;
  }
  return (data?.photos ?? []) as DrivePhoto[];
}

/** Downscale + compress an image file in the browser before upload. */
async function compress(file: File, maxSize = 1800, quality = 0.85): Promise<{ blob: Blob; type: string }> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return { blob: file, type: file.type };
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
    if (!blob) return { blob: file, type: file.type };
    return { blob, type: "image/jpeg" };
  } catch {
    return { blob: file, type: file.type };
  }
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function uploadGalleryPhoto(file: File, uploadedBy: string): Promise<void> {
  const { blob, type } = await compress(file);
  const base = file.name.replace(/\.[^.]+$/, "");
  const ext = type === "image/jpeg" ? "jpg" : (file.name.split(".").pop() || "jpg");
  const { data, error } = await supabase.functions.invoke("gallery-upload", {
    body: {
      name: `${base}-${Date.now()}.${ext}`,
      mimeType: type,
      uploadedBy,
      data: await toBase64(blob),
    },
  });
  if (error) {
    console.error("uploadGalleryPhoto error", error, data);
    throw error;
  }
}
