"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    published: formData.get("published") === "on",
  };
}

export async function createNews(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.news.create({ data: { ...data, image } });
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updateNews(id: number, formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.news.update({ where: { id }, data: { ...data, ...(image ? { image } : {}) } });
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNews(id: number) {
  await requireAdmin();
  await db.news.delete({ where: { id } });
  revalidatePath("/admin/news");
}
