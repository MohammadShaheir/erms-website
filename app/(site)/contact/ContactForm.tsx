"use client";

import { useActionState } from "react";
import { sendMessage } from "./actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, null);

  if (state?.ok) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <div className="mb-2 text-4xl">✅</div>
        <h3 className="mb-1 text-xl font-extrabold text-green-800">تم إرسال رسالتك بنجاح</h3>
        <p className="text-green-700">سنتواصل معك في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">الاسم *</label>
          <input name="name" required className="input" placeholder="الاسم الكامل" />
        </div>
        <div>
          <label className="label">البريد الإلكتروني *</label>
          <input name="email" type="email" required className="input" dir="ltr" placeholder="example@mail.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">رقم الهاتف</label>
          <input name="phone" className="input" dir="ltr" placeholder="01xxxxxxxxx" />
        </div>
        <div>
          <label className="label">الموضوع</label>
          <input name="subject" className="input" placeholder="موضوع الرسالة" />
        </div>
      </div>
      <div>
        <label className="label">الرسالة *</label>
        <textarea name="message" required rows={6} className="input" placeholder="اكتب رسالتك هنا..." />
      </div>
      {state?.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 font-bold text-red-700">{state.error}</div>
      )}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
