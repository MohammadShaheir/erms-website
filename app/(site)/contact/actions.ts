"use server";

import { db } from "@/lib/db";

export async function sendMessage(_prev: { ok: boolean; error?: string } | null, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "يرجى ملء الاسم والبريد الإلكتروني والرسالة" };
  }
  if (message.length > 5000) {
    return { ok: false, error: "الرسالة طويلة جدًا" };
  }

  await db.contactMessage.create({
    data: { name, email, phone: phone || null, subject: subject || null, message },
  });
  return { ok: true };
}
