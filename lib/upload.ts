import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";

const ALLOWED = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".pdf"];

/**
 * Saves an uploaded file and returns its public URL, or null if empty.
 * Uses Vercel Blob in production (when BLOB_READ_WRITE_TOKEN is set),
 * falls back to public/uploads for local development.
 */
export async function saveUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.includes(ext)) throw new Error("نوع الملف غير مسموح به");
  if (file.size > 10 * 1024 * 1024) throw new Error("حجم الملف أكبر من 10 ميجابايت");
  const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${name}`, file, { access: "public" });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
