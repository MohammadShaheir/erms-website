"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function fields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/\s+/g, "-"),
    title: String(formData.get("title") ?? "").trim(),
    degree: String(formData.get("degree") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    admissionReq: String(formData.get("admissionReq") ?? "").trim(),
    published: formData.get("published") === "on",
  };
}

export async function createProgram(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  const program = await db.program.create({ data: { ...data, image } });
  revalidatePath("/programs");
  redirect(`/admin/programs/${program.id}`);
}

export async function updateProgram(id: number, formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  const image = await saveUpload(formData.get("image") as File | null);
  await db.program.update({ where: { id }, data: { ...data, ...(image ? { image } : {}) } });
  revalidatePath("/programs");
  redirect("/admin/programs");
}

export async function deleteProgram(id: number) {
  await requireAdmin();
  await db.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
}

export async function addProgramCourse(programId: number, formData: FormData) {
  await requireAdmin();
  await db.programCourse.create({
    data: {
      programId,
      code: String(formData.get("code") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      creditHours: Number(formData.get("creditHours") ?? 0) || 0,
      examHours: formData.get("examHours") ? Number(formData.get("examHours")) : null,
      note: String(formData.get("note") ?? "").trim() || null,
      order: Number(formData.get("order") ?? 0) || 0,
    },
  });
  revalidatePath(`/admin/programs/${programId}`);
  revalidatePath("/programs");
}

export async function deleteProgramCourse(programId: number, courseId: number) {
  await requireAdmin();
  await db.programCourse.delete({ where: { id: courseId } });
  revalidatePath(`/admin/programs/${programId}`);
  revalidatePath("/programs");
}
