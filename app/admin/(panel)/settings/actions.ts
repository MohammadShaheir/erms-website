"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const keys = [
    "siteName", "heroTitle", "heroSubtitle", "aboutBrief", "aboutFull",
    "goals", "activities", "membership", "email", "phone1", "phone2",
    "address", "facebook", "regNumber", "foundedDate",
  ];
  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) {
      await db.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
  }
  revalidatePath("/", "layout");
}

export async function changePassword(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData
) {
  const session = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (next.length < 8) return { error: "كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف" };

  const admin = await db.admin.findUnique({ where: { id: session.adminId } });
  if (!admin || !(await bcrypt.compare(current, admin.password))) {
    return { error: "كلمة المرور الحالية غير صحيحة" };
  }
  await db.admin.update({
    where: { id: admin.id },
    data: { password: await bcrypt.hash(next, 10) },
  });
  return { ok: true };
}
