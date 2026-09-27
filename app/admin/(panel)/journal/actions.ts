"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function fields(formData: FormData) {
  const date = String(formData.get("date") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: date ? new Date(date) : new Date(),
    published: formData.get("published") === "on",
  };
}

export async function createIssue(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  const pdfUrl = await saveUpload(formData.get("pdf") as File | null);
  await db.journalIssue.create({ data: { ...data, image, pdfUrl } });
  revalidatePath("/journal");
  redirect("/admin/journal");
}

export async function updateIssue(id: number, formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  const pdfUrl = await saveUpload(formData.get("pdf") as File | null);
  await db.journalIssue.update({
    where: { id },
    data: { ...data, ...(image ? { image } : {}), ...(pdfUrl ? { pdfUrl } : {}) },
  });
  revalidatePath("/journal");
  redirect("/admin/journal");
}

export async function deleteIssue(id: number) {
  await requireAdmin();
  await db.journalIssue.delete({ where: { id } });
  revalidatePath("/admin/journal");
}
