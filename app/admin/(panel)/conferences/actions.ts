"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function fields(formData: FormData) {
  const start = String(formData.get("startDate") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim() || null,
    startDate: start ? new Date(start) : null,
    published: formData.get("published") === "on",
  };
}

export async function createConference(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.conference.create({ data: { ...data, image } });
  revalidatePath("/conferences");
  redirect("/admin/conferences");
}

export async function updateConference(id: number, formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.conference.update({ where: { id }, data: { ...data, ...(image ? { image } : {}) } });
  revalidatePath("/conferences");
  redirect("/admin/conferences");
}

export async function deleteConference(id: number) {
  await requireAdmin();
  await db.conference.delete({ where: { id } });
  revalidatePath("/admin/conferences");
}
