"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "عام",
    duration: String(formData.get("duration") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
}

export async function createCourse(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.course.create({ data: { ...data, image } });
  revalidatePath("/training");
  redirect("/admin/courses");
}

export async function updateCourse(id: number, formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.course.update({ where: { id }, data: { ...data, ...(image ? { image } : {}) } });
  revalidatePath("/training");
  redirect("/admin/courses");
}

export async function deleteCourse(id: number) {
  await requireAdmin();
  await db.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
}
