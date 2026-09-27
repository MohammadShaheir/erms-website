"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function toggleRead(id: number) {
  await requireAdmin();
  const msg = await db.contactMessage.findUnique({ where: { id } });
  if (msg) await db.contactMessage.update({ where: { id }, data: { read: !msg.read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await db.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
