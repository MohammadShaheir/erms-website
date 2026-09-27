"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function addMember(formData: FormData) {
  await requireAdmin();
  const photo = await saveUpload(formData.get("photo") as File | null);
  await db.boardMember.create({
    data: {
      name: String(formData.get("name") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      order: Number(formData.get("order") ?? 0) || 0,
      photo,
    },
  });
  revalidatePath("/about");
  revalidatePath("/admin/board");
}

export async function updateMember(id: number, formData: FormData) {
  await requireAdmin();
  const photo = await saveUpload(formData.get("photo") as File | null);
  await db.boardMember.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      order: Number(formData.get("order") ?? 0) || 0,
      ...(photo ? { photo } : {}),
    },
  });
  revalidatePath("/about");
  revalidatePath("/admin/board");
}

export async function deleteMember(id: number) {
  await requireAdmin();
  await db.boardMember.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/board");
}
