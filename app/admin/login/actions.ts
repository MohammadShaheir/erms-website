"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function login(_prev: { error: string } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const admin = await db.admin.findFirst({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }
  await createSession(admin.id, admin.name);
  redirect("/admin");
}
