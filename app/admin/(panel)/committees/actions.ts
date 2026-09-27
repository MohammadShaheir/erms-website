"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function addCommittee(formData: FormData) {
  await requireAdmin();
  await db.committee.create({
    data: {
      name: String(formData.get("name") ?? "").trim(),
      order: Number(formData.get("order") ?? 0) || 0,
    },
  });
  revalidatePath("/about");
  revalidatePath("/admin/committees");
}

export async function deleteCommittee(id: number) {
  await requireAdmin();
  await db.committee.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/committees");
}
